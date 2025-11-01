import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/format';

type Props = {
  searchParams: {
    session_id?: string;
    quoteId?: string;
  };
};

export const metadata: Metadata = {
  title: 'Order confirmed | BuyFromChina.ca',
  description: 'Your BuyFromChina.ca payment is confirmed. We will handle procurement and delivery to Canada.'
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id: sessionId, quoteId } = searchParams;

  const order = sessionId
    ? await prisma.order.findUnique({ where: { stripeSessionId: sessionId }, include: { quote: true } })
    : quoteId
      ? await prisma.order.findUnique({ where: { quoteId }, include: { quote: true } })
      : null;

  if (!order) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment received</h1>
          <p className="mt-4 text-sm text-gray-600">
            Thank you! If you need an updated receipt, contact us at{' '}
            <a href="mailto:support@buyfromchina.ca" className="text-primary">
              support@buyfromchina.ca
            </a>
            .
          </p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">✓</div>
            <div>
              <h1 className="text-2xl font-bold text-green-900">Payment confirmed</h1>
              <p className="text-sm text-green-800">
                We received your payment. Our sourcing team will place the order and update you with tracking details.
              </p>
            </div>
          </div>

          <dl className="mt-8 space-y-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Order ID</dt>
              <dd>{order.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Quote ID</dt>
              <dd>{order.quoteId}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Paid on</dt>
              <dd>{formatDate(order.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Total</dt>
              <dd>{formatCurrency(Number(order.totalCad))}</dd>
            </div>
          </dl>

          <div className="mt-8 space-y-3">
            <Link href={`/admin/orders/${order.id}`} className="btn-secondary inline-flex">
              View in admin
            </Link>
            <Link href="/" className="btn-primary inline-flex">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
