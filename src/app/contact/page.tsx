import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import DisclaimerBanner from '@/components/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Contact us | BuyFromChina.ca',
  description: 'Questions about importing from Taobao or Tmall? Reach out to the BuyFromChina.ca team for support.'
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact our team</h1>
          <p className="text-base text-gray-600">
            We’re here to help with sizing checks, bulk orders, or any questions about the import process.
          </p>
        </header>
        <DisclaimerBanner className="mb-8" />
        <ContactForm />
      </div>
    </div>
  );
}
