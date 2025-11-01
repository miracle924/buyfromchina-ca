import { OrderStatus, Prisma } from '@prisma/client';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Orders | BuyFromChina.ca'
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

type SearchParams = {
  status?: OrderStatus | 'ALL';
  q?: string;
};

const statuses: Array<{ value: OrderStatus | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All statuses' },
  ...Object.values(OrderStatus).map((status) => ({ value: status, label: status }))
];

export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const where: Prisma.OrderWhereInput = {};

  if (searchParams.status && searchParams.status !== 'ALL') {
    where.status = searchParams.status;
  }

  if (searchParams.q) {
    const q = searchParams.q;
    where.OR = [
      { id: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { quoteId: { contains: q, mode: 'insensitive' } }
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      quote: true
    }
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-600">Monitor paid orders and update fulfillment statuses.</p>
      </header>
      <form className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-4">
        <input
          type="search"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search order id, quote id, email"
          className="sm:col-span-2 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <select
          name="status"
          defaultValue={searchParams.status ?? 'ALL'}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-3 sm:justify-start">
          <Link href="/admin/orders" className="btn-secondary">
            Reset
          </Link>
          <button type="submit" className="btn-primary">
            Filter
          </button>
        </div>
      </form>
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Quote ID</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Total (CAD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-primary">
                    {order.id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/quotes/${order.quoteId}`} className="text-primary">
                    {order.quoteId}
                  </Link>
                </td>
                <td className="px-4 py-3">{order.email}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(Number(order.totalCad))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="px-4 py-6 text-sm text-gray-500">No orders found or payment data has not been recorded yet.</p>
        )}
      </div>
    </div>
  );
}
