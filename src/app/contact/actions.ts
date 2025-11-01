'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { rateLimiter } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';
import { env } from '@/env';

type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.').max(80, 'Name must be under 80 characters.'),
  email: z.string().email('Enter a valid email address.'),
  message: z.string().min(10, 'Tell us how we can help (at least 10 characters).').max(2000)
});

export const submitContact = async (_prev: ContactState, formData: FormData): Promise<ContactState> => {
  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  if (!rateLimiter.consume(`contact:${ip}`)) {
    return { error: 'Too many messages. Please wait a minute and try again.' };
  }

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors)
        .filter(([, value]) => value && value.length)
        .map(([key, [value]]) => [key, value])
    );
    return { error: 'Please fix the highlighted fields.', fieldErrors };
  }

  const { name, email, message } = parsed.data;

  await sendEmail({
    to: env.ADMIN_EMAIL,
    subject: `Contact form inquiry from ${name}`,
    html: `<p>${name} &lt;${email}&gt; sent a message:</p><blockquote>${message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</blockquote>`,
    text: `From: ${name} <${email}>\n\n${message}`
  });

  return { success: true };
};

export type { ContactState };
