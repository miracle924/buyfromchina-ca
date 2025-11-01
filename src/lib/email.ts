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

export const sendEmail = async ({ to, subject, html, text }: EmailPayload) => {
  const recipients = Array.isArray(to) ? to : [to];
  const from = env.EMAIL_FROM ?? `no-reply@${new URL(env.NEXTAUTH_URL ?? 'http://localhost:3000').hostname}`;

  if (resendClient) {
    try {
      await resendClient.emails.send({ from, to: recipients, subject, html, text });
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Resend email failure, falling back to SMTP:', error);
    }
  }

  const mailer = getTransporter();
  if (mailer) {
    await mailer.sendMail({ from, to: recipients, subject, html, text });
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Email fallback (no provider configured):', { to: recipients, subject });
  }
};
