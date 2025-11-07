import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Privacy Policy | BuyFromChina.ca',
  description: 'Learn how BuyFromChina.ca collects, uses, and protects your personal information.'
};

export default function PrivacyPage() {
  const {
    legal: { privacy }
  } = getDictionary();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{privacy.title}</h1>
        <p className="mt-4 text-sm text-gray-600">
          {privacy.effectiveLabel}: {privacy.effectiveDate}
        </p>

        <section className="mt-8 space-y-6 text-sm text-gray-700">
          <p>{privacy.intro}</p>
          {privacy.sections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>
              {'intro' in section && section.intro ? <p>{section.intro}</p> : null}
              {'body' in section && section.body
                ? section.body.map((paragraph, index) => <p key={`${section.heading}-${index}`}>{paragraph}</p>)
                : null}
              {'list' in section && section.list ? (
                <ul className="list-disc space-y-2 pl-4">
                  {section.list.map((item, index) => (
                    <li key={`${section.heading}-item-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
