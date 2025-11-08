'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { SiteNav } from '@/components/site-nav';
import { LanguageSwitcher } from '@/components/language-switcher';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-lg font-semibold text-gray-900"
          onClick={closeMobile}
        >
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition group-hover:border-primary/40">
            <Image
              src="/images/logo.jpeg"
              alt="BuyFromChina.ca"
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
              priority
            />
          </span>
          <span className="tracking-tight">BuyFromChina.ca</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <SiteNav />
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-700 transition hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div className="border-t border-gray-200 bg-white shadow-lg md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
            <SiteNav direction="vertical" onNavigate={closeMobile} />
            <div className="flex justify-end">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
