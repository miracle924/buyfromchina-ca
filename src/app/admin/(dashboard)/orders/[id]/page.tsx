import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/format';
import { OrderStatusForm } from '@/components/order-status-form';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Order ${params.id} | BuyFromChina.ca`
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function OrderDetailPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      quote: true
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Order {order.id}</h1>
          <p className="text-sm text-gray-600">Created {formatDate(order.createdAt)}</p>
          <dl className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Email</dt>
              <dd>{order.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Status</dt>
              <dd>{order.status}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Stripe session</dt>
              <dd className="truncate">{order.stripeSessionId}</dd>
            </div>
            {order.stripePaymentId && (
              <div className="flex justify-between">
                <dt>Stripe payment</dt>
                <dd className="truncate">{order.stripePaymentId}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>Total</dt>
              <dd>{formatCurrency(Number(order.totalCad))}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Related quote</h2>
          <dl className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Quote ID</dt>
              <dd>
                <Link href={`/admin/quotes/${order.quoteId}`} className="text-primary">
                  {order.quoteId}
                </Link>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Status</dt>
              <dd>{order.quote.status}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Total</dt>
              <dd>{formatCurrency(Number(order.quote.totalCad))}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="space-y-4">
        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li>
              <a href={`/success?quoteId=${order.quoteId}`} className="text-primary">
                View customer confirmation page
              </a>
            </li>
            <li>
              <a href={`/checkout/${order.quoteId}`} className="text-primary">
                Re-open Stripe checkout (if unpaid)
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
