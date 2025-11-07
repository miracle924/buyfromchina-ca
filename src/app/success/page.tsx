import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/format';
import { getDictionary } from '@/lib/i18n';

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
  const dictionary = getDictionary();
  const copy = dictionary.successPage;

  const order = sessionId
    ? await prisma.order.findUnique({ where: { stripeSessionId: sessionId }, include: { quote: true } })
    : quoteId
      ? await prisma.order.findUnique({ where: { quoteId }, include: { quote: true } })
      : null;

  if (!order) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{copy.noOrder.title}</h1>
          <p className="mt-4 text-sm text-gray-600">{copy.noOrder.body}</p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            {copy.noOrder.back}
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
              <h1 className="text-2xl font-bold text-green-900">{copy.confirmed.title}</h1>
              <p className="text-sm text-green-800">{copy.confirmed.subtitle}</p>
            </div>
          </div>

          <dl className="mt-8 space-y-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>{copy.confirmed.details.orderId}</dt>
              <dd>{order.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy.confirmed.details.quoteId}</dt>
              <dd>{order.quoteId}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy.confirmed.details.paidOn}</dt>
              <dd>{formatDate(order.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy.confirmed.details.total}</dt>
              <dd>{formatCurrency(Number(order.totalCad))}</dd>
            </div>
          </dl>

          <div className="mt-8 space-y-3">
            <Link href={`/admin/orders/${order.id}`} className="btn-secondary inline-flex">
              {copy.confirmed.adminLink}
            </Link>
            <Link href="/" className="btn-primary inline-flex">
              {copy.confirmed.homeLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
