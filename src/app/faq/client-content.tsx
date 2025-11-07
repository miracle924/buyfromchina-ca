'use client';

import type { Metadata } from 'next';
import { Accordion } from '@/components/accordion';
import { useLanguage } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | BuyFromChina.ca',
  description: 'Answers about our Taobao/Tmall procurement service, pricing, payments, and delivery timelines for Canada.'
};

export default function FaqPageContent() {
  const { dictionary } = useLanguage();
  const copy = dictionary.faq;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{copy.title}</h1>
          <p className="text-base text-gray-600">{copy.intro}</p>
        </header>
        <Accordion items={copy.items} />
      </div>
    </div>
  );
}
