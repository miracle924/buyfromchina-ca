import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Terms of Service | BuyFromChina.ca',
  description: 'Review the terms governing the BuyFromChina.ca Taobao and Tmall procurement service.'
};

export default function TermsPage() {
  const {
    legal: { terms }
  } = getDictionary();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{terms.title}</h1>
        <p className="mt-4 text-sm text-gray-600">
          {terms.effectiveLabel}: {terms.effectiveDate}
        </p>

        <section className="mt-8 space-y-6 text-sm text-gray-700">
          <p>{terms.intro}</p>
          {terms.sections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>
              {section.body?.map((paragraph, index) => (
                <p key={`${section.heading}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
          <p>{terms.contact}</p>
        </section>
      </div>
    </div>
  );
}
