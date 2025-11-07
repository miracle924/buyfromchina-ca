'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { dictionary, locale } = useLanguage();
  const copy = dictionary.globalError;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">{copy.badge}</p>
          <h1 className="text-3xl font-semibold text-gray-900">{copy.title}</h1>
          <p className="text-sm text-gray-600">
            {copy.description} Error code: {error.digest ?? 'unknown'}.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="btn-primary"
          >
            {copy.retry}
          </button>
          <Link
            href="/admin"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {copy.adminLink}
          </Link>
        </div>
      </body>
    </html>
  );
}
