import Image from 'next/image';
import Link from 'next/link';
import DisclaimerBanner from '@/components/DisclaimerBanner';

const steps = [
  {
    title: 'Send us the Taobao/Tmall link',
    description:
      'Share the item URL, size, and any notes. We validate the listing and calculate all costs in CAD.',
    artwork: '/images/home/step-1.jpg'
  },
  {
    title: 'Confirm your quote',
    description:
      'Review the full breakdown including shipping, tax, and service fee. Approve it or ask for tweaks.',
    artwork: '/images/home/step-2.jpg'
  },
  {
    title: 'Pay securely',
    description: 'Checkout with Stripe in Canadian dollars. We order from the seller and handle logistics.',
    artwork: '/images/home/step-3-secure.jpg'
  },
  {
    title: 'Track delivery to Canada',
    description: 'We coordinate domestic shipping so your parcel lands right at your doorstep.',
    artwork: '/images/home/step-4.jpg'
  }
];

const reasons = [
  {
    title: 'Specialized Taobao expertise',
    description: 'We navigate language barriers, payment hurdles, and seller vetting so you don’t have to.',
    artwork: '/images/home/reason-1.jpg'
  },
  {
    title: 'Transparent pricing',
    description: 'Every quote shows item cost, service fee, tax, and shipping upfront—no surprise charges later.',
    artwork: '/images/home/reason-2.jpg'
  },
  {
    title: 'Stripe-protected payments',
    description: 'Complete your order using Stripe Checkout for bank-grade security and buyer protection.',
    artwork: '/images/home/reason-3-stripe.jpg'
  },
  {
    title: 'Dedicated Canadian support',
    description: 'Our team is based in Canada and available to help via email any time you have questions.',
    artwork: '/images/home/reason-4.jpg'
  }
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
              China’s Best, Delivered to Canada.
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              From Taobao to your doorstep.
            </h1>
            <p className="text-lg text-gray-600">
              BuyFromChina.ca is the simplest way for Canadians to shop Taobao and Tmall. We verify listings, convert the
              pricing to CAD, and handle purchasing, customs, and delivery.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary">
                Request a Quote
              </Link>
              <Link href="#how-it-works" className="btn-secondary">
                See how it works
              </Link>
            </div>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                12h
              </span>
              Quotes delivered within 12 hours. Test purchases and consolidated shipping available. Customs are handled by Taobao’s direct-shipping service.
            </p>
          </div>
          <div className="relative flex-1">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/60 shadow-2xl">
              <Image
                src="/images/home/hero.jpg"
                alt="Canadian shopper reviewing Taobao finds"
                width={960}
                height={640}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm uppercase tracking-wide text-white/70">Real purchases</p>
                <h2 className="text-2xl font-semibold">Curated Taobao finds, shipped to Canada with care.</h2>
              </div>
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
            <h2 className="text-3xl font-bold text-gray-900">About BuyFromChina.ca</h2>
            <p className="text-lg text-gray-600">
              We are a Canadian-owned procurement service dedicated to helping shoppers access China’s biggest marketplaces.
              Our bilingual sourcing team verifies sellers, consolidates logistics, and delivers a smooth end-to-end experience.
              Whether you are importing a single pair of sneakers or outfitting an entire studio, we treat every order with the same care.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-primary">10-14 business days</p>
                <p className="mt-2 text-sm text-gray-600">Typical delivery window from Qingdao consolidation warehouse to Canadian doorstep.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-primary">100% CAD pricing</p>
                <p className="mt-2 text-sm text-gray-600">Quotes include currency conversion, duties, tax, and local courier drop-off.</p>
              </div>
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
              <p className="text-sm uppercase tracking-wide text-white/70">On-the-ground quality checks</p>
              <p className="mt-2 text-lg font-semibold">Partners across Guangzhou, Hangzhou, and Shenzhen keep your orders on schedule.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            Four clear steps from inspiration to delivery. Every request is handled by our bilingual procurement specialists.
          </p>
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
            <h2 className="text-3xl font-bold text-gray-900">Why choose us</h2>
            <p className="text-gray-600">
              We combine local insights with on-the-ground partners in China to deliver a premium experience for Canadian shoppers and businesses alike.
            </p>
            <Link href="/quote" className="btn-primary w-max">
              Start your quote
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
            <h2 className="text-3xl font-bold text-white">What importers across Canada say</h2>
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
            <h2 className="text-3xl font-bold">Ready to import your next Taobao find?</h2>
            <p className="text-base text-pink-100">
              Get a tailored quote in Canadian dollars. No obligations until you confirm the payment.
            </p>
          </div>
          <Link href="/quote" className="btn-secondary border-white text-white hover:bg-white/10">
            Start your quote
          </Link>
        </div>
      </section>
    </div>
  );
}
