import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote-form';
import DisclaimerBanner from '@/components/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Request a Quote | BuyFromChina.ca',
  description:
    'Request a fully transparent Taobao/Tmall quote in Canadian dollars. We validate the listing, estimate shipping, and email you the breakdown.'
};

export default function QuotePage() {
  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <DisclaimerBanner className="mb-10" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              China’s Best, Delivered to Canada.
            </p>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Request a quote</h1>
            <p className="mt-4 text-base text-gray-600">
              Tell us what you want from Taobao or Tmall and we will send you a detailed CAD quote with shipping, duties,
              tax, and service fee included. Approve the quote to pay securely via Stripe Checkout.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="font-semibold text-primary">24/7 sourcing support</p>
                <p className="mt-2">
                  Our bilingual buyers coordinate with Taobao sellers, confirm stock, and answer questions within 12 hours.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="font-semibold text-primary">Everything in CAD</p>
                <p className="mt-2">
                  Quotes include cross-border shipping, duties, tax, and our service fee. You’ll never be surprised by hidden costs.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-white to-transparent blur-3xl" />
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
