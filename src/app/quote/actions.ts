'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Prisma, QuoteSize, QuoteStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimiter } from '@/lib/rate-limit';
import { sanitizeNotes } from '@/lib/sanitize';
import { PRICING_VERSION, calculatePricing } from '@/lib/pricing';
import { buildQuoteEmails } from '@/emails/templates';
import { sendEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { env } from '@/env';
import { randomUUID } from 'node:crypto';
import type { QuoteFormState, QuoteSummary } from '@/types/quote';
import { normalizeProductUrlInput, joinProductUrlsForStorage, splitProductUrls } from '@/lib/product-urls';
import { getDictionary } from '@/lib/i18n';

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
  const dictionary = getDictionary();
  const copy = dictionary.quoteForm;
  const clientIp = headers().get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';

  if (!rateLimiter.consume(`quote:${clientIp}`)) {
    return errorState(copy.server.rateLimited);
  }

  const quoteSchema = z.object({
    productURLs: z
      .string()
      .transform((value) => normalizeProductUrlInput(value))
      .refine(
        (urls) => urls.length === 0 || urls.every((url) => isValidUrl(url)),
        copy.zod.urlsInvalid
      ),
    recipientName: z
      .string()
      .trim()
      .min(2, copy.zod.recipientName)
      .transform((value) => value.trim()),
    email: z.string().email(copy.zod.email),
    postalCode: z
      .string()
      .transform((value) => value.trim().toUpperCase())
      .refine(
        (value) => /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(value),
        copy.zod.postalCode
      ),
    notes: z.string().max(1500, copy.zod.notes).optional(),
    referencePrice: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined))
      .refine(
        (value) => value === undefined || (Number.isFinite(value) && value > 0 && value <= 250),
        copy.zod.referencePrice
      ),
    size: z.nativeEnum(QuoteSize, {
      errorMap: () => ({ message: copy.zod.size })
    })
  });

  const entries = Array.from(formData.entries()).filter(([key, value]) => {
    if (key !== 'attachments') return true;
    return !(value instanceof File) || value.size > 0;
  });
  const submission = Object.fromEntries(entries.filter(([key]) => key !== 'attachments'));
  const attachmentFiles = formData
    .getAll('attachments')
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (attachmentFiles.length > MAX_ATTACHMENTS) {
    return errorState(copy.server.attachmentsExceeded);
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
    return errorState(copy.status.generalError, fieldErrors);
  }

  const { productURLs, email, recipientName, postalCode, notes, referencePrice, size } = parsed.data;
  const normalizedProductURL = joinProductUrlsForStorage(productURLs);

  const pricing = calculatePricing({
    productURL: normalizedProductURL ?? '',
    size,
    postalCode,
    referencePrice
  });

  const quoteId = randomUUID();
  const uploadedPaths: string[] = [];
  const attachments: string[] = [];

  for (const file of attachmentFiles) {
    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      return errorState(copy.server.attachmentTooLarge);
    }

    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_ATTACHMENT_TYPES.includes(mimeType)) {
      return errorState(copy.server.attachmentType);
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
      return errorState(copy.server.uploadError);
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
        addressLine1: '',
        addressLine2: null,
        city: '',
        province: '',
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
    return errorState(copy.status.generalError);
  }
};
