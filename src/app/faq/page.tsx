import type { Metadata } from 'next';
import { Accordion } from '@/components/accordion';

const faqs = [
  {
    id: 'sourcing',
    question: 'How do you source items from Taobao or Tmall?',
    answer:
      'Our bilingual staff confirms product availability directly with the seller, verifies sizing or specification details, and submits payment using trusted domestic methods. We only purchase from sellers with strong ratings and responsive customer service.'
  },
  {
    id: 'pricing',
    question: 'What is included in the quote?',
    answer:
      'Every quote includes the product cost converted to CAD, our 15% service fee (minimum $5), international shipping to Canada based on parcel size, and 13% HST. Remote postal codes may include an additional shipping surcharge.'
  },
  {
    id: 'timeline',
    question: 'How long does delivery take?',
    answer:
      'Most shipments arrive in 10-14 business days after payment, depending on seller dispatch speed and Canadian customs processing. We email tracking updates as soon as the parcel leaves China and again when it clears customs.'
  },
  {
    id: 'payment',
    question: 'How do I pay for my order?',
    answer:
      'Once you approve the quote, you will be redirected to Stripe Checkout to complete payment with your preferred credit card or Apple Pay/Google Pay wallet. Your card information never touches our servers.'
  },
  {
    id: 'returns-policy',
    question: 'Do you guarantee product quality or accept returns?',
    answer:
      'We’re a purchasing agent that helps you buy items directly from Chinese marketplaces. We’ll do our best to select listings with strong ratings and reviews, but we can’t guarantee product quality and we don’t provide returns or exchanges. Please review the product details carefully before ordering.'
  }
];

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | BuyFromChina.ca',
  description: 'Answers about our Taobao/Tmall procurement service, pricing, payments, and delivery timelines for Canada.'
};

export default function FaqPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
          <p className="text-base text-gray-600">
            Everything you need to know about bringing China’s best products to Canada with confidence.
          </p>
        </header>
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
