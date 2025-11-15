import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import { headers } from 'next/headers';
import '@/app/globals.css';
import { siteUrl } from '@/env';
import { Providers } from '@/components/providers';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { detectLocale } from '@/lib/i18n';
import { CookieBanner } from '@/components/cookie-banner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const redditPixelId = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID ?? 'a2_i02wmpl91j9v';
const redditMatchConfig = {
  email: process.env.NEXT_PUBLIC_REDDIT_MATCH_EMAIL,
  phoneNumber: process.env.NEXT_PUBLIC_REDDIT_MATCH_PHONE,
  externalId: process.env.NEXT_PUBLIC_REDDIT_MATCH_EXTERNAL_ID,
  idfa: process.env.NEXT_PUBLIC_REDDIT_MATCH_IDFA,
  aaid: process.env.NEXT_PUBLIC_REDDIT_MATCH_AAID
};
const redditInitOptions = Object.fromEntries(
  Object.entries(redditMatchConfig).filter(([, value]) => Boolean(value))
);
const redditInitOptionsScript = Object.keys(redditInitOptions).length ? `, ${JSON.stringify(redditInitOptions)}` : '';

const title = 'BuyFromChina.ca – China’s Best, Delivered to Canada.';
const description =
  'BuyFromChina.ca helps Canadians import Taobao and Tmall products effortlessly. Request a quote, approve in CAD, and pay securely via Stripe.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: ['/favicon.ico', '/favicon-32x32.png', '/favicon.png']
  },
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
  const locale = detectLocale();

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <Script id="reddit-pixel-base" strategy="afterInteractive">
          {`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
            var generateRedditConversionId = function(){return (crypto && typeof crypto.randomUUID==='function') ? crypto.randomUUID() : (Date.now()+'-'+Math.round(Math.random()*1e9));};
            rdt('init','${redditPixelId}'${redditInitOptionsScript});
            rdt('track','PageVisit',{conversionId: generateRedditConversionId()});
          `}
        </Script>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <Providers initialLocale={locale}>
          <div className="min-h-screen bg-white">
            {inAdmin ? (
              <main id="main" className="bg-white">
                {children}
              </main>
            ) : (
              <>
                <SiteHeader />
                <main id="main" className="bg-white">
                  {children}
                </main>
                <SiteFooter />
                <CookieBanner />
              </>
            )}
          </div>
        </Providers>
        <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
