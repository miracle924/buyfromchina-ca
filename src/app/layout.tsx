import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import '@/app/globals.css';
import { siteUrl } from '@/env';
import { Providers } from '@/components/providers';
import { SiteNav } from '@/components/site-nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const title = 'BuyFromChina.ca – China’s Best, Delivered to Canada.';
const description =
  'BuyFromChina.ca helps Canadians import Taobao and Tmall products effortlessly. Request a quote, approve in CAD, and pay securely via Stripe.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'BuyFromChina.ca' }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.jpg']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BuyFromChina.ca',
  url: siteUrl,
  logo: `${siteUrl}/og.jpg`
};

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = headers().get('next-url') ?? '';
  const inAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en" className={inter.className}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <Providers>
          <div className="min-h-screen bg-white">
            {inAdmin ? (
              <main id="main" className="bg-white">
                {children}
              </main>
            ) : (
              <>
                <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur">
                  <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
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
                    <SiteNav />
                  </div>
                </header>
                <main id="main" className="bg-white">
                  {children}
                </main>
                <footer className="border-t border-gray-200 bg-gray-50">
                  <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p>&copy; {new Date().getFullYear()} BuyFromChina.ca. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                      <a href="/legal/terms" className="hover:text-primary hover:underline">
                        Terms
                      </a>
                      <a href="/legal/privacy" className="hover:text-primary hover:underline">
                        Privacy
                      </a>
                      <a href="/contact" className="hover:text-primary">
                        Support
                      </a>
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
              </>
            )}
          </div>
        </Providers>
        <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
