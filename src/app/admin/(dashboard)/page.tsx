import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Admin dashboard | BuyFromChina.ca'
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function AdminDashboardPage() {
  const [quoteCount, orderAgg, recentQuotes] = await Promise.all([
    prisma.quote.count(),
    prisma.order.aggregate({
      _sum: { totalCad: true },
      _count: { _all: true }
    }),
    prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  const revenue = Number(orderAgg._sum.totalCad ?? 0);
  const orderCount = orderAgg._count._all ?? 0;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total quotes</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{quoteCount}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Orders processed</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{orderCount}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Revenue collected</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(revenue)}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">Recent quotes</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Quote ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Total (CAD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
              {recentQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <a href={`/admin/quotes/${quote.id}`} className="text-primary">
                      {quote.id}
                    </a>
                  </td>
                  <td className="px-4 py-3">{quote.email}</td>
                  <td className="px-4 py-3">{quote.status}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(Number(quote.totalCad))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentQuotes.length === 0 && (
            <p className="px-4 py-6 text-sm text-gray-500">No quotes yet. Create one from the public form.</p>
          )}
        </div>
      </section>
    </div>
  );
}
