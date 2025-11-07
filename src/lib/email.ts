import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { env } from '@/env';

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

let transporter: nodemailer.Transporter | null = null;
const resendClient = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
const RESEND_FALLBACK_FROM = 'BuyFromChina.ca <onboarding@resend.dev>';

const getTransporter = () => {
  if (transporter) return transporter;

  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 587,
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD
    }
  });

  return transporter;
};

const tryResend = async (from: string, recipients: string[], subject: string, html: string, text?: string) => {
  if (!resendClient) return false;
  await resendClient.emails.send({ from, to: recipients, subject, html, text });
  return true;
};

export const sendEmail = async ({ to, subject, html, text }: EmailPayload) => {
  const recipients = Array.isArray(to) ? to : [to];
  const preferredFrom = env.EMAIL_FROM ?? RESEND_FALLBACK_FROM;

  try {
    if (await tryResend(preferredFrom, recipients, subject, html, text)) {
      return true;
    }

    if (preferredFrom !== RESEND_FALLBACK_FROM) {
      // eslint-disable-next-line no-console
      console.error('Resend email failure with custom sender, retrying fallback');
      if (await tryResend(RESEND_FALLBACK_FROM, recipients, subject, html, text)) {
        return true;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Resend email failure:', error);
  }

  const mailer = getTransporter();
  if (mailer) {
    try {
      await mailer.sendMail({ from: preferredFrom, to: recipients, subject, html, text });
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('SMTP email failure:', error);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Email fallback (no provider configured):', { to: recipients, subject });
    return true;
  }

  return false;
};
