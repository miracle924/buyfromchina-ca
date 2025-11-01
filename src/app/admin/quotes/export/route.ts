import { QuoteStatus, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const statusValues = new Set(Object.values(QuoteStatus));

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';
  const status = searchParams.get('status');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const where: Prisma.QuoteWhereInput = {};
  if (status && statusValues.has(status as QuoteStatus)) {
    where.status = status as QuoteStatus;
  }
  if (q) {
    where.OR = [
      { email: { contains: q, mode: 'insensitive' } },
      { productURL: { contains: q, mode: 'insensitive' } },
      { recipientName: { contains: q, mode: 'insensitive' } },
      { addressLine1: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { province: { contains: q, mode: 'insensitive' } },
      { postalCode: { contains: q, mode: 'insensitive' } }
    ];
  }
  if (from || to) {
    where.createdAt = {};
    if (from) {
      const fromDate = new Date(from);
      if (!Number.isNaN(fromDate.getTime())) {
        where.createdAt.gte = fromDate;
      }
    }
    if (to) {
      const toDate = new Date(to);
      if (!Number.isNaN(toDate.getTime())) {
        where.createdAt.lte = toDate;
      }
    }
  }

  const quotes = await prisma.quote.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  const header = [
    'Quote ID',
    'Email',
    'Recipient',
    'Address line 1',
    'Address line 2',
    'City',
    'Province',
    'Postal code',
    'Size',
    'Status',
    'Item cost',
    'Service fee',
    'Shipping',
    'Tax',
    'Total',
    'Attachments',
    'Created at'
  ];

  const rows = quotes.map((quote) => [
    quote.id,
    quote.email,
    quote.recipientName,
    quote.addressLine1,
    quote.addressLine2 ?? '',
    quote.city,
    quote.province,
    quote.postalCode,
    quote.size,
    quote.status,
    Number(quote.itemCostCad).toFixed(2),
    Number(quote.serviceFeeCad).toFixed(2),
    Number(quote.shippingCad).toFixed(2),
    Number(quote.taxCad).toFixed(2),
    Number(quote.totalCad).toFixed(2),
    quote.attachments.join(' '),
    quote.createdAt.toISOString()
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="quotes-export-${Date.now()}.csv"`
    }
  });
}
