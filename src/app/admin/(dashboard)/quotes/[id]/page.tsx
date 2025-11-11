import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { siteUrl } from '@/env';
import { formatDate, formatCurrency } from '@/lib/format';
import { QuoteEditForm } from '@/components/quote-edit-form';
import { CopyButton } from '@/components/copy-button';
import { splitProductUrls } from '@/lib/product-urls';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Quote ${params.id} | BuyFromChina.ca`
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function QuoteDetailPage({ params }: Props) {
  const quote = await prisma.quote.findUnique({
    where: { id: params.id },
    include: {
      order: true,
      audits: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!quote) {
    notFound();
  }

  const checkoutUrl = `${siteUrl}/checkout/${quote.id}`;
  const productUrls = splitProductUrls(quote.productURL);

  const editable = {
    id: quote.id,
    itemCostCad: Number(quote.itemCostCad),
    serviceFeeCad: Number(quote.serviceFeeCad),
    shippingCad: Number(quote.shippingCad),
    totalCad: Number(quote.totalCad),
    status: quote.status
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote {quote.id}</h1>
          <p className="text-sm text-gray-600">
            Created {formatDate(quote.createdAt)} • {quote.status}
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Customer details</h2>
            <dl className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Recipient</dt>
                <dd>{quote.recipientName}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Email</dt>
                <dd>{quote.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Postal code</dt>
                <dd>{quote.postalCode}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Size</dt>
                <dd>{quote.size}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-800">Mailing address</dt>
                <dd className="mt-1 text-gray-700">
                  <p>{quote.addressLine1}</p>
                  {quote.addressLine2 ? <p>{quote.addressLine2}</p> : null}
                  <p>
                    {quote.city}, {quote.province} {quote.postalCode}
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-800">Product URLs</dt>
                <dd>
                  {productUrls.length > 0 ? (
                    <ul className="space-y-1">
                      {productUrls.map((url) => (
                        <li key={url}>
                          <a href={url} className="break-words text-primary hover:text-primary/80">
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">Not provided</span>
                  )}
                </dd>
              </div>
              {quote.notes && (
                <div>
                  <dt className="font-medium text-gray-800">Customer notes</dt>
                  <dd className="rounded-xl bg-gray-100 p-3 text-gray-700">{quote.notes}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Manual follow-up</h2>
            <p className="mt-2 text-sm text-gray-700">
              No automated pricing is generated. Review the customer context below and reply with a custom quote. Only send the Stripe checkout link once you have confirmed pricing with the customer.
            </p>
            <dl className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Reference price (customer)</dt>
                <dd>{quote.referencePrice ? formatCurrency(Number(quote.referencePrice)) : 'Not provided'}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Requested size</dt>
                <dd>{quote.size}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Status</dt>
                <dd>{quote.status}</dd>
              </div>
            </dl>
          </div>

          {quote.attachments.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Reference images</h2>
              <p className="mt-2 text-sm text-gray-600">
                Uploaded by the customer during quote submission. Click an image to open it in a new tab.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {quote.attachments.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group overflow-hidden rounded-xl border border-gray-200"
                  >
                    <Image
                      src={url}
                      alt="Quote attachment"
                      width={512}
                      height={512}
                      className="h-40 w-full object-cover transition duration-150 group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {quote.order && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Order</h2>
              <dl className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <dt>Order ID</dt>
                  <dd>
                    <Link href={`/admin/orders/${quote.order.id}`} className="text-primary">
                      {quote.order.id}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Status</dt>
                  <dd>{quote.order.status}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Stripe session</dt>
                  <dd className="truncate">{quote.order.stripeSessionId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Total</dt>
                  <dd>{formatCurrency(Number(quote.order.totalCad))}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <QuoteEditForm quote={editable} />

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Stripe checkout link</h2>
            <p className="mt-2 text-sm text-gray-700">
              Once you confirm pricing with the customer, send them the secure checkout link below. They will be able to
              pay by credit card and the order status will update automatically after payment succeeds.
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Checkout URL</p>
                <p className="mt-2 break-all text-sm text-gray-800">{checkoutUrl}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <CopyButton value={checkoutUrl} />
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Open checkout preview
                </a>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Tip: copy the link into your email response. Payments marked as PAID will appear in the Order section below.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Audit trail</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              {quote.audits.map((audit) => (
                <li key={audit.id} className="rounded-xl bg-gray-50 p-4">
                  <p className="font-medium text-gray-900">{audit.actorEmail}</p>
                  <p className="text-xs text-gray-500">{formatDate(audit.createdAt)}</p>
                  <pre className="mt-2 whitespace-pre-wrap rounded bg-white p-3 text-xs text-gray-600">
                    {JSON.stringify(audit.changes, null, 2)}
                  </pre>
                </li>
              ))}
              {quote.audits.length === 0 && <li className="text-sm text-gray-500">No edits recorded yet.</li>}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
