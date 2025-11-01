'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OrderStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { stripe, buildCheckoutLineItems } from '@/lib/stripe';
import { siteUrl } from '@/env';

export type CheckoutState = {
  error?: string;
};

const schema = z.object({
  quoteId: z.string().min(1)
});

export async function createCheckoutSession(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: 'Invalid quote details submitted.' };
  }

  const { quoteId } = parsed.data;

  const quote = await prisma.quote.findUnique({
    where: { id: quoteId }
  });

  if (!quote) {
    return { error: 'We could not find that quote. Please request a new quote.' };
  }

  if (quote.status === 'CANCELLED') {
    return { error: 'This quote has been cancelled. Submit a new quote request to continue.' };
  }

  if (quote.status === 'PAID') {
    redirect(`/success?quoteId=${quoteId}`);
  }

  const total = Number(quote.totalCad);

  if (!Number.isFinite(total) || total <= 0) {
    return {
      error:
        'This quote does not have a payable total yet. Update the pricing details in the admin panel before sending the checkout link.'
    };
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/${quoteId}`,
      customer_email: quote.email,
      metadata: { quoteId },
      line_items: buildCheckoutLineItems({ quoteId, total })
    });
  } catch (error) {
    console.error('Failed to create checkout session', error);
    const message =
      typeof error === 'object' && error && 'message' in error
        ? String(error.message)
        : 'We could not start Stripe checkout. Please try again shortly.';
    return { error: message };
  }

  if (!session.url) {
    return { error: 'Stripe did not return a checkout URL. Try again in a moment.' };
  }

  const order = await prisma.order.upsert({
    where: { quoteId },
    update: {
      stripeSessionId: session.id,
      stripePaymentId: null,
      email: quote.email,
      totalCad: quote.totalCad,
      status: OrderStatus.PENDING
    },
    create: {
      quoteId,
      stripeSessionId: session.id,
      stripePaymentId: null,
      email: quote.email,
      totalCad: quote.totalCad,
      status: OrderStatus.PENDING
    }
  });

  revalidatePath('/admin/orders');
  revalidatePath('/admin/quotes');
  revalidatePath(`/admin/quotes/${quoteId}`);
  revalidatePath(`/admin/orders/${order.id}`);

  redirect(session.url);
}
