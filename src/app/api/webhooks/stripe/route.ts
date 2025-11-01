import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { buildReceiptEmail } from '@/emails/templates';

export async function POST(request: Request) {
  const signature = headers().get('stripe-signature');
  if (!signature) {
    return new NextResponse('Missing signature', { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Webhook signature verification failed', error);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const quoteId = session.metadata?.quoteId;
    if (!quoteId) {
      return NextResponse.json({ received: true });
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id;

    const order = await prisma.order.findUnique({
      where: { stripeSessionId: session.id },
      include: { quote: true }
    });

    if (!order) {
      console.warn('Order not found for session', session.id);
      return NextResponse.json({ received: true });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        stripePaymentId: paymentIntentId ?? order.stripePaymentId
      },
      include: { quote: true }
    });

    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: { status: 'PAID' }
    });

    revalidatePath(`/admin/quotes/${quoteId}`);
    revalidatePath(`/admin/orders/${updatedOrder.id}`);
    revalidatePath('/admin/quotes');
    revalidatePath('/admin/orders');

    const receipt = buildReceiptEmail({ order: updatedOrder, quote: updatedQuote });

    await Promise.all([
      sendEmail({
        to: updatedOrder.email,
        subject: receipt.subject,
        html: receipt.html,
        text: receipt.text
      }),
      sendEmail({
        to: env.ADMIN_EMAIL,
        subject: `Order paid – ${updatedOrder.id}`,
        html: receipt.html,
        text: receipt.text
      })
    ]);
  }

  return NextResponse.json({ received: true });
}
