'use client';

import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { useLanguage } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'Contact us | BuyFromChina.ca',
  description: 'Questions about importing from Taobao or Tmall? Reach out to the BuyFromChina.ca team for support.'
};

export default function ContactPageContent() {
  const { dictionary } = useLanguage();
  const copy = dictionary.contactPage;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{copy.title}</h1>
          <p className="text-base text-gray-600">{copy.subtitle}</p>
        </header>
        <DisclaimerBanner className="mb-8" />
        <ContactForm />
      </div>
    </div>
  );
}
