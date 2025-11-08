'use client';

import Image from 'next/image';
import Link from 'next/link';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { useLanguage } from '@/components/language-provider';

const stepArtworks = ['/images/home/step-1.jpg', '/images/home/step-2.jpg', '/images/home/step-3-secure.jpg', '/images/home/step-4.jpg'];
const reasonArtworks = [
  '/images/home/reason-1.jpg',
  '/images/home/reason-2.jpg',
  '/images/home/reason-3-stripe.jpg',
  '/images/home/reason-4.jpg'
];

const testimonials = [
  {
    quote:
      'The team handled everything—from seller chats to customs paperwork. My Taobao designer pieces arrived in two weeks!',
    name: 'Maya L.',
    role: 'Toronto, ON',
    image: '/images/home/testimonial-1.jpg'
  },
  {
    quote: 'Clear pricing, fast responses, and a seamless Stripe checkout. Way easier than navigating Taobao myself.',
    name: 'Jason P.',
    role: 'Vancouver, BC',
    image: '/images/home/testimonial-2.jpg'
  }
];

export default function HomePage() {
  const { dictionary } = useLanguage();
  const home = dictionary.home;

  const steps = home.how.steps.map((step, index) => ({
    ...step,
    artwork: stepArtworks[index]
  }));
  const reasons = home.reasons.cards.map((card, index) => ({
    ...card,
    artwork: reasonArtworks[index]
  }));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-50 via-white to-white"
          aria-hidden
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary shadow-sm">
              {home.badge}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {home.headline}
            </h1>
            <p className="text-lg text-gray-600">{home.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary">
                {home.primaryCta}
              </Link>
              <Link href="#how-it-works" className="btn-secondary">
                {home.secondaryCta}
              </Link>
            </div>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {home.statChip}
              </span>
              {home.statDescription}
            </p>
          </div>
          <div className="relative flex-1">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/60 shadow-2xl">
              <Image
                src="/images/home/taobao.png"
                alt="BuyFromChina shipment illustration"
                width={960}
                height={640}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
              {home.bannerTitle ? (
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {home.bannerTag ? (
                    <p className="text-sm uppercase tracking-wide text-white/70">{home.bannerTag}</p>
                  ) : null}
                  <h2 className="text-2xl font-semibold">{home.bannerTitle}</h2>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <DisclaimerBanner className="mb-16" />
      </div>

      <section id="about" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">{home.about.title}</h2>
            <p className="text-lg text-gray-600">{home.about.body}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {home.about.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-primary">{stat.label}</p>
                  <p className="mt-2 text-sm text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/home/about.png"
              alt="BuyFromChina.ca: 从淘宝到你家 - logistics from China to Canada"
              width={1080}
              height={608}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm uppercase tracking-wide text-white/70">{home.about.overlayTag}</p>
              <p className="mt-2 text-lg font-semibold">{home.about.overlayBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900">{home.how.title}</h2>
          <p className="mt-3 max-w-2xl text-gray-600">{home.how.intro}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {steps.map((step, index) => (
              <article key={step.title} className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src={step.artwork}
                  alt={step.title}
                  width={640}
                  height={400}
                  className="h-48 w-full object-cover transition group-hover:scale-105"
                />
                <div className="space-y-3 p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">{home.reasons.title}</h2>
            <p className="text-gray-600">{home.reasons.intro}</p>
            <Link href="/quote" className="btn-primary w-max">
              {home.reasons.cta}
            </Link>
          </div>
          <div className="grid flex-1 gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Image src={reason.artwork} alt={reason.title} width={520} height={360} className="h-40 w-full object-cover" />
                <div className="space-y-2 p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{reason.title}</h3>
                  <p className="text-sm text-gray-600">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <h2 className="text-3xl font-bold text-white">{home.testimonialsTitle}</h2>
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col gap-4 rounded-3xl bg-white/5 p-6 text-white backdrop-blur transition hover:bg-white/10">
                <div className="flex items-center gap-4">
                  <Image src={t.image} alt={t.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-white/70">{t.role}</p>
                  </div>
                </div>
                <blockquote className="text-sm leading-relaxed text-white/90">“{t.quote}”</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" aria-hidden />
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">{home.closing.title}</h2>
            <p className="text-base text-pink-100">{home.closing.description}</p>
          </div>
          <Link href="/quote" className="btn-secondary border-white text-white hover:bg-white/10">
            {home.closing.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
