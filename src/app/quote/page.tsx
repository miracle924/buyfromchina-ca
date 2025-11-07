'use client';

import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote-form';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { useLanguage } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'Request a Quote | BuyFromChina.ca',
  description:
    'Request a fully transparent Taobao/Tmall quote in Canadian dollars. We validate the listing, estimate shipping, and email you the breakdown.'
};

export default function QuotePage() {
  const { dictionary } = useLanguage();
  const copy = dictionary.quotePage;

  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <DisclaimerBanner className="mb-10" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              {copy.badge}
            </p>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{copy.title}</h1>
            <p className="mt-4 text-base text-gray-600">{copy.description}</p>
            <div className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
              {copy.cards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-primary">{card.title}</p>
                  <p className="mt-2">{card.body}</p>
                </div>
              ))}
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
