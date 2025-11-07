'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function SiteFooter() {
  const { dictionary } = useLanguage();
  const footer = dictionary.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; {currentYear} BuyFromChina.ca. {footer.copy}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/legal/terms" className="hover:text-primary hover:underline">
            {footer.terms}
          </Link>
          <Link href="/legal/privacy" className="hover:text-primary hover:underline">
            {footer.privacy}
          </Link>
          <Link href="/contact" className="hover:text-primary">
            {footer.support}
          </Link>
          <Link href="/admin/quotes" className="hover:text-primary">
            {footer.admin}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/share/16VPYhb4CT/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our Facebook page"
            className="rounded-full border border-transparent p-2 text-gray-500 transition hover:border-primary/30 hover:text-primary"
          >
            <Facebook className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="https://www.instagram.com/buyfromchina.ca?igsh=bnpvYWZraXFrZ2Fn&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our Instagram profile"
            className="rounded-full border border-transparent p-2 text-gray-500 transition hover:border-primary/30 hover:text-primary"
          >
            <Instagram className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="https://x.com/wzy924?s=21"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit our Twitter profile"
            className="rounded-full border border-transparent p-2 text-gray-500 transition hover:border-primary/30 hover:text-primary"
          >
            <Twitter className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
