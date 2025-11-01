import { QuoteStatus, Prisma } from '@prisma/client';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Quotes | BuyFromChina.ca'
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

type SearchParams = {
  q?: string;
  status?: QuoteStatus | 'ALL';
  from?: string;
  to?: string;
};

const statusOptions: Array<{ value: QuoteStatus | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All statuses' },
  ...Object.values(QuoteStatus).map((status) => ({ value: status, label: status }))
];

const parseDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export default async function QuotesPage({ searchParams }: { searchParams: SearchParams }) {
  const filters: SearchParams = {
    status: (searchParams.status as QuoteStatus | 'ALL') ?? 'ALL',
    q: (searchParams.q ?? '').trim(),
    from: searchParams.from,
    to: searchParams.to
  };

  const where: Prisma.QuoteWhereInput = {};

  if (filters.status && filters.status !== 'ALL') {
    where.status = filters.status;
  }

  if (filters.q) {
    where.OR = [
      { email: { contains: filters.q, mode: 'insensitive' } },
      { productURL: { contains: filters.q, mode: 'insensitive' } },
      { postalCode: { contains: filters.q, mode: 'insensitive' } }
    ];
  }

  const fromDate = parseDate(filters.from);
  const toDate = parseDate(filters.to);
  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt.gte = fromDate;
    if (toDate) where.createdAt.lte = toDate;
  }

  const quotes = await prisma.quote.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  const current = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) current.set(key, value);
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track all customer requests. Adjust totals, export CSV, and update quote statuses as orders progress.
        </p>
      </header>

      <form className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-5">
        <input
          type="search"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search email, URL, postal code"
          className="sm:col-span-2 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <select
          name="status"
          defaultValue={searchParams.status ?? 'ALL'}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="from"
          defaultValue={searchParams.from}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <input
          type="date"
          name="to"
          defaultValue={searchParams.to}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <div className="sm:col-span-5 flex justify-end gap-3">
          <Link href="/admin/quotes" className="btn-secondary">
            Reset
          </Link>
          <button type="submit" className="btn-primary">
            Filter
          </button>
          <a
            href={`/admin/quotes/export?${current.toString()}`}
            className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Export CSV
          </a>
        </div>
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Quote ID</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Postal code</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Total (CAD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/quotes/${quote.id}`} className="text-primary">
                    {quote.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{quote.email}</td>
                <td className="px-4 py-3">{quote.postalCode}</td>
                <td className="px-4 py-3">{quote.status}</td>
                <td className="px-4 py-3">{formatDate(quote.createdAt)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(Number(quote.totalCad))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {quotes.length === 0 && (
          <p className="px-4 py-6 text-sm text-gray-500">
            No quotes match your filters or the database is not yet initialized.
          </p>
        )}
      </div>
    </div>
  );
}
