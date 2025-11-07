'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { rateLimiter } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';
import { env } from '@/env';
import { getDictionary } from '@/lib/i18n';

type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export const submitContact = async (_prev: ContactState, formData: FormData): Promise<ContactState> => {
  const dictionary = getDictionary();
  const copy = dictionary.contactForm;
  const schema = z.object({
    name: z.string().min(2, copy.errors.nameRequired).max(80, copy.errors.nameMax),
    email: z.string().email(copy.errors.emailInvalid),
    message: z.string().min(10, copy.errors.messageMin).max(2000, copy.errors.messageMax)
  });
  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  if (!rateLimiter.consume(`contact:${ip}`)) {
    return { error: copy.errors.rateLimited };
  }

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors)
        .filter(([, value]) => value && value.length)
        .map(([key, [value]]) => [key, value])
    );
    return { error: copy.errors.fixFields, fieldErrors };
  }

  const { name, email, message } = parsed.data;

  const delivered = await sendEmail({
    to: env.ADMIN_EMAIL,
    subject: `Contact form inquiry from ${name}`,
    html: `<p>${name} &lt;${email}&gt; sent a message:</p><blockquote>${message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</blockquote>`,
    text: `From: ${name} <${email}>\n\n${message}`
  });
  if (!delivered) {
    return { error: copy.errors.deliveryFailed };
  }

  return { success: true };
};

export type { ContactState };
