import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/format';
import { CheckoutButton } from '@/components/checkout-button';

type Props = {
  params: { quoteId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Checkout ${params.quoteId} | BuyFromChina.ca`
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function CheckoutPage({ params }: Props) {
  const quote = await prisma.quote.findUnique({ where: { id: params.quoteId } });

  if (!quote) {
    notFound();
  }

  if (quote.status === 'PAID') {
    redirect(`/success?quoteId=${quote.id}`);
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-600">Quote {quote.id}</p>
            </div>
            <CheckoutButton quoteId={quote.id} />
          </div>

          <dl className="mt-8 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
              <dt>Recipient</dt>
              <dd>{quote.recipientName}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
              <dt>Email</dt>
              <dd>{quote.email}</dd>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 sm:col-span-2">
              <dt className="font-medium text-gray-800">Mailing address</dt>
              <dd className="mt-1 text-gray-700">
                <p>{quote.addressLine1}</p>
                {quote.addressLine2 ? <p>{quote.addressLine2}</p> : null}
                <p>
                  {quote.city}, {quote.province} {quote.postalCode}
                </p>
              </dd>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
              <dt>Postal code</dt>
              <dd>{quote.postalCode}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
              <dt>Item cost</dt>
              <dd>{formatCurrency(Number(quote.itemCostCad))}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
              <dt>Service fee</dt>
              <dd>{formatCurrency(Number(quote.serviceFeeCad))}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
              <dt>Shipping</dt>
              <dd>{formatCurrency(Number(quote.shippingCad))}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-green-50 p-3 font-semibold text-green-800 sm:col-span-2">
              <dt>Total due</dt>
              <dd>{formatCurrency(Number(quote.totalCad))}</dd>
            </div>
          </dl>

          <div className="mt-8 space-y-4 text-sm text-gray-700">
            <p>
              Once we receive your transfer, we will confirm by email and begin procuring your items. Payments typically auto-deposit instantly.
            </p>
            <p>
              If you have daily transfer limits, you can split the total into multiple payments—just reference Quote {quote.id} each time.
            </p>
            <p className="text-gray-500">
              Questions? Reply to your quote email or contact us at{' '}
              <a href="mailto:support@buyfromchina.ca" className="text-primary">
                support@buyfromchina.ca
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
