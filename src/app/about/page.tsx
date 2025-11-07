import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About BuyFromChina.ca | Meet the Team Bringing Taobao to Canada',
  description:
    'Learn how BuyFromChina.ca helps Canadians import Taobao and Tmall finds with white-glove concierge service, transparent pricing, and trusted logistics.'
};

const processSteps = [
  {
    title: 'Discover',
    description:
      'Send us the product links or reference images that caught your eye. We verify sellers, stock, and variations.'
  },
  {
    title: 'Quote',
    description:
      'You receive an all-inclusive CAD breakdown covering product cost, logistics, duties, and service fee with clear timelines.'
  },
  {
    title: 'Checkout',
    description:
      'Approve the quote and pay securely through Stripe. We finalize the purchase, track parcels, and keep you updated.'
  },
  {
    title: 'Deliver',
    description:
      'Parcels route through trusted consolidators and arrive at your Canadian address, ready for unboxing without surprises.'
  }
];

const testimonials = [
  {
    quote:
      'They sourced limited-edition designer pieces that Taobao sellers wouldn’t ship to Canada. Communication was fast and the CAD pricing matched the final invoice.',
    name: 'Lena W.',
    role: 'Vancouver, BC'
  },
  {
    quote:
      'I run a small resale shop and depend on consistent restocks. BuyFromChina.ca handles quality checks, consolidation, and customs so I can focus on customers.',
    name: 'Darius P.',
    role: 'Toronto, ON'
  },
  {
    quote:
      'This is easily the smoothest Taobao buying experience I’ve had. Stripe checkout, proactive updates, and delivery in under two weeks!',
    name: 'Michelle K.',
    role: 'Calgary, AB'
  }
];

const values = [
  {
    title: 'Transparency first',
    description: 'All pricing is broken down in CAD with zero hidden fees. You know exactly what each shipment costs.'
  },
  {
    title: 'Human support',
    description: 'You speak with real buyers fluent in Mandarin and English who negotiate with sellers on your behalf.'
  },
  {
    title: 'Trusted logistics',
    description:
      'We work with vetted forwarders and double-check packaging so your parcels arrive safely, insured, and on schedule.'
  },
  {
    title: 'Sustainable choices',
    description: 'We consolidate shipments where possible and partner with carriers committed to offsetting emissions.'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">About BuyFromChina.ca</p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 text-center sm:text-5xl">
            Trusted Taobao &amp; Tmall procurement for Canadians.
          </h1>
          <p className="mt-6 max-w-2xl text-center text-lg text-gray-600 mx-auto">
            We bridge the language, payment, and logistics gap so you can access China&apos;s most exciting marketplaces
            without the stress. From single-item shoppers to bulk resellers, we deliver end-to-end support designed for
            Canadian buyers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Meet our Founder</h2>
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
            <p>
              I&apos;m Amelia, founder of BuyFromChina.ca, a platform that makes it easy for Canadians to shop trusted
              products directly from China. After living in Canada for over a decade, I created this service to simplify
              cross-border shopping and share the creativity and quality of Chinese brands with more people.
            </p>
          </div>
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-8 text-center shadow-lg shadow-primary/10 max-w-3xl">
            <h3 className="text-xl font-semibold text-primary text-center">What drives us</h3>
            <p className="mt-4 text-gray-700">
              We believe Canadian buyers deserve the same access to China’s makers as local shoppers. Our role is to
              remove uncertainty—whether that&apos;s opaque pricing, payments that bounce, or packages that get stuck at
              the border—so every order feels effortless.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Our Proven Process</h2>
          <p className="mt-2 max-w-3xl mx-auto text-center text-gray-600">
            We&apos;ve distilled hundreds of transactions into a predictable workflow that keeps you informed at each
            milestone.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {processSteps.map((step) => (
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
        <h2 className="text-3xl font-semibold text-gray-900 text-center">What our customers say</h2>
        <p className="mt-2 max-w-3xl mx-auto text-center text-gray-600">
          Thousands of Canadians rely on us for timely communication, transparent CAD pricing, and parcels that arrive
          when promised.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
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
          <h2 className="text-3xl font-semibold text-center">Our Core Values</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
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
            <h2 className="text-3xl font-semibold text-gray-900 text-center">Our Mission</h2>
            <p className="text-gray-600 text-center md:text-left">
              To make every Canadian feel confident buying from China&apos;s marketplaces by pairing concierge support
              with automation that removes friction. We champion small sellers, highlight authentic products, and build
              reliable trade routes that empower cross-border creativity.
            </p>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6 text-sm text-gray-700">
            <p>
              We&apos;re continuously improving our tooling—pricing engines, order tracking, customs documentation—so
              you spend less time translating and more time enjoying your finds.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Get in touch</h2>
          <p className="max-w-2xl text-gray-600">
            Ready to start your next import project—or need advice on navigating Taobao and Tmall? We&apos;d love to
            help. Reach out and we&apos;ll respond within 12 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/quote" className="btn-primary">
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-gray-300 text-gray-800 hover:border-primary hover:text-primary"
            >
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
