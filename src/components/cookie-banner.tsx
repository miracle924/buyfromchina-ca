'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'bfc-cookie-consent';
const COOKIE_NAME = 'bfc_cookie_consent';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = window.localStorage.getItem(STORAGE_KEY) ??
      document.cookie.split('; ').find(row => row.startsWith(`${COOKIE_NAME}=`));
    if (!consent) {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  const accept = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    document.cookie = `${COOKIE_NAME}=accepted; max-age=${ONE_YEAR_SECONDS}; path=/; SameSite=Lax`;
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          We use essential cookies to keep BuyFromChina.ca secure and reliable.{' '}
          <Link
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Learn more
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-900"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
