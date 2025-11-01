'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Prisma, QuoteSize, QuoteStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimiter } from '@/lib/rate-limit';
import { sanitizeNotes } from '@/lib/sanitize';
import { PRICING_VERSION } from '@/lib/pricing';
import { buildQuoteEmails } from '@/emails/templates';
import { sendEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { env } from '@/env';
import { randomUUID } from 'node:crypto';
import type { QuoteFormState, QuoteSummary } from '@/types/quote';
import { normalizeProductUrlInput, joinProductUrlsForStorage, splitProductUrls } from '@/lib/product-urls';

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE_BYTES = 15 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = ['image/png', 'image/jpeg'];
const ALLOWED_ATTACHMENT_EXTENSIONS = ['png', 'jpg', 'jpeg'];

const quoteSchema = z.object({
  productURLs: z
    .string()
    .transform((value) => normalizeProductUrlInput(value))
    .refine(
      (urls) => urls.length === 0 || urls.every((url) => isValidUrl(url)),
      'Please enter valid Taobao/Tmall URLs separated by new lines or commas.'
    ),
  recipientName: z
    .string()
    .trim()
    .min(2, 'Enter the recipient name.')
    .transform((value) => value.trim()),
  addressLine1: z
    .string()
    .trim()
    .min(5, 'Enter the street address.')
    .transform((value) => value.trim()),
  addressLine2: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  city: z
    .string()
    .trim()
    .min(2, 'Enter a city.')
    .transform((value) => value.trim()),
  province: z
    .string()
    .trim()
    .min(2, 'Enter a province or territory.')
    .transform((value) => value.trim().toUpperCase()),
  email: z.string().email('Use a valid email address.'),
  postalCode: z
    .string()
    .transform((value) => value.trim().toUpperCase())
    .refine(
      (value) => /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(value),
      'Enter a valid Canadian postal code (e.g. M5V 2T6).'
    ),
  notes: z.string().max(1500, 'Notes must be 1500 characters or less.').optional(),
  referencePrice: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
    }),
  size: z.nativeEnum(QuoteSize)
});

const toSummary = (quote: {
  id: string;
  email: string;
  productURL: string | null;
  recipientName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  province: string;
  postalCode: string;
  notes: string | null;
  size: QuoteSize;
  createdAt: Date;
  status: QuoteStatus;
  itemCostCad: Prisma.Decimal;
  serviceFeeCad: Prisma.Decimal;
  shippingCad: Prisma.Decimal;
  taxCad: Prisma.Decimal;
  totalCad: Prisma.Decimal;
  attachments: string[];
}): QuoteSummary => ({
  id: quote.id,
  email: quote.email,
  productURLs: splitProductUrls(quote.productURL),
  recipientName: quote.recipientName,
  addressLine1: quote.addressLine1,
  addressLine2: quote.addressLine2,
  city: quote.city,
  province: quote.province,
  postalCode: quote.postalCode,
  notes: quote.notes,
  size: quote.size,
  attachments: quote.attachments ?? [],
  createdAt: quote.createdAt.toISOString(),
  status: quote.status,
  breakdown: {
    itemCostCad: Number(quote.itemCostCad),
    serviceFeeCad: Number(quote.serviceFeeCad),
    shippingCad: Number(quote.shippingCad),
    taxCad: Number(quote.taxCad),
    totalCad: Number(quote.totalCad)
  }
});

const errorState = (message: string, fieldErrors?: Record<string, string>): QuoteFormState => ({
  success: false,
  error: message,
  fieldErrors
});

export const createQuote = async (_prevState: QuoteFormState, formData: FormData): Promise<QuoteFormState> => {
  const clientIp = headers().get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';

  if (!rateLimiter.consume(`quote:${clientIp}`)) {
    return errorState('Too many quote attempts. Please wait a minute and try again.');
  }

  const entries = Array.from(formData.entries()).filter(([key, value]) => {
    if (key !== 'attachments') return true;
    return !(value instanceof File) || value.size > 0;
  });
  const submission = Object.fromEntries(entries.filter(([key]) => key !== 'attachments'));
  const attachmentFiles = formData
    .getAll('attachments')
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (attachmentFiles.length > MAX_ATTACHMENTS) {
    return errorState(`Upload up to ${MAX_ATTACHMENTS} reference images.`);
  }

  const parsed = quoteSchema.safeParse(submission);

  if (!parsed.success) {
    const fieldErrors = Object.entries(parsed.error.flatten().fieldErrors).reduce<Record<string, string>>(
      (acc, [key, [value]]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {}
    );
    return errorState('Please correct the highlighted fields.', fieldErrors);
  }

  const {
    productURLs,
    email,
    recipientName,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
    notes,
    referencePrice,
    size
  } = parsed.data;
  const normalizedProductURL = joinProductUrlsForStorage(productURLs);

  const pricing = {
    itemCostCad: 0,
    serviceFeeCad: 0,
    shippingCad: 0,
    taxCad: 0,
    totalCad: 0
  };

  const quoteId = randomUUID();
  const uploadedPaths: string[] = [];
  const attachments: string[] = [];

  for (const file of attachmentFiles) {
    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      return errorState('Each image must be 15MB or smaller.');
    }

    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_ATTACHMENT_TYPES.includes(mimeType)) {
      return errorState('Only PNG and JPEG images are supported.');
    }

    const originalName = file.name?.toLowerCase() ?? '';
    const extCandidate = originalName.includes('.') ? originalName.split('.').pop() ?? '' : '';
    const extension = ALLOWED_ATTACHMENT_EXTENSIONS.includes(extCandidate)
      ? extCandidate
      : mimeType === 'image/png'
        ? 'png'
        : 'jpg';
    const objectPath = `${quoteId}/${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from(env.SUPABASE_QUOTE_BUCKET)
      .upload(objectPath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Failed to upload quote attachment', uploadError);
      return errorState('Uploading reference images failed. Please try again.');
    }

    uploadedPaths.push(objectPath);
    const {
      data: { publicUrl }
    } = supabaseAdmin.storage.from(env.SUPABASE_QUOTE_BUCKET).getPublicUrl(objectPath);
    attachments.push(publicUrl);
  }

  try {
    const created = await prisma.quote.create({
      data: {
        id: quoteId,
        email,
        recipientName,
        addressLine1,
        addressLine2: addressLine2 ?? null,
        city,
        province,
        productURL: normalizedProductURL,
        postalCode,
        notes: notes ? sanitizeNotes(notes) : null,
        size,
        referencePrice: referencePrice ? new Prisma.Decimal(referencePrice) : null,
        itemCostCad: new Prisma.Decimal(pricing.itemCostCad),
        serviceFeeCad: new Prisma.Decimal(pricing.serviceFeeCad),
        shippingCad: new Prisma.Decimal(pricing.shippingCad),
        taxCad: new Prisma.Decimal(pricing.taxCad),
        totalCad: new Prisma.Decimal(pricing.totalCad),
        pricingVersion: PRICING_VERSION,
        attachments,
        status: QuoteStatus.SENT
      }
    });

    const templates = buildQuoteEmails({ quote: created });

    await Promise.all([
      sendEmail({
        to: email,
        subject: templates.user.subject,
        html: templates.user.html,
        text: templates.user.text
      }),
      sendEmail({
        to: env.ADMIN_EMAIL,
        subject: templates.admin.subject,
        html: templates.admin.html,
        text: templates.admin.text
      })
    ]);

    revalidatePath('/admin/quotes');

    return {
      success: true,
      quote: toSummary(created)
    };
  } catch (error) {
    if (uploadedPaths.length > 0) {
      await supabaseAdmin.storage.from(env.SUPABASE_QUOTE_BUCKET).remove(uploadedPaths);
    }
    // eslint-disable-next-line no-console
    console.error('Failed to create quote', error);
    return errorState('We hit a snag generating your quote. Please try again shortly.');
  }
};
