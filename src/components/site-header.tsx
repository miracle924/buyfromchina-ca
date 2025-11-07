'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SiteNav } from '@/components/site-nav';
import { LanguageSwitcher } from '@/components/language-switcher';

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group inline-flex items-center gap-3 text-lg font-semibold text-gray-900">
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
          <SiteNav />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
