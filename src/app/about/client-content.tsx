'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export const metadata: Metadata = {
  title: 'About BuyFromChina.ca | Meet the Team Bringing Taobao to Canada',
  description:
    'Learn how BuyFromChina.ca helps Canadians import Taobao and Tmall finds with white-glove concierge service, transparent pricing, and trusted logistics.'
};

export default function AboutPageContent() {
  const { dictionary } = useLanguage();
  const copy = dictionary.about;

  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{copy.heroTag}</p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 text-center sm:text-5xl">{copy.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-center text-lg text-gray-600 mx-auto">{copy.heroBody}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">{copy.founderHeading}</h2>
        </div>
        <div className="mt-10 flex flex-col items-center gap-8 text-center">
          <Image
            src="/images/amelia.png"
            alt="Portrait of Amelia Wang, founder of BuyFromChina.ca"
            width={320}
            height={320}
            priority
            className="h-auto w-full max-w-[240px] rounded-3xl border border-gray-200 object-cover shadow-lg"
          />
          <div className="space-y-4 text-gray-600 max-w-2xl">
            <p>{copy.founderBio}</p>
            {copy.founderLinkedIn ? (
              <div className="flex justify-center">
                <Link
                  href={copy.founderLinkedIn.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                  <span>{copy.founderLinkedIn.label}</span>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-8 text-center shadow-lg shadow-primary/10 max-w-3xl">
            <h3 className="text-xl font-semibold text-primary text-center">{copy.driverTitle}</h3>
            <p className="mt-4 text-gray-700">{copy.driverBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">{copy.processTitle}</h2>
          <p className="mt-2 max-w-3xl mx-auto text-center text-gray-600">{copy.processIntro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {copy.processSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-center">{step.title}</h3>
                <p className="mt-3 text-sm text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">{copy.testimonialsTitle}</h2>
        <p className="mt-2 max-w-3xl mx-auto text-center text-gray-600">{copy.testimonialsIntro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-gray-700">
                <span className="text-4xl text-primary" aria-hidden>
                  &ldquo;
                </span>
                {testimonial.quote}
                <span className="text-4xl text-primary" aria-hidden>
                  &rdquo;
                </span>
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-gray-900">
                {testimonial.name}
                <span className="mt-0.5 block text-xs font-normal uppercase tracking-wide text-gray-500">
                  {testimonial.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center">{copy.valuesTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {copy.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
                <h3 className="text-lg font-semibold text-center">{value.title}</h3>
                <p className="mt-3 text-sm text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-gray-900 text-center">{copy.missionTitle}</h2>
            <p className="text-gray-600 text-center md:text-left">{copy.missionBody}</p>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6 text-sm text-gray-700">
            <p>{copy.missionNote}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">{copy.ctaTitle}</h2>
          <p className="max-w-2xl text-gray-600">{copy.ctaBody}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/quote" className="btn-primary">
              {copy.ctaPrimary}
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-gray-300 text-gray-800 hover:border-primary hover:text-primary"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
