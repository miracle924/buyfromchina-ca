import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BuyFromChina.ca',
  description: 'Learn how BuyFromChina.ca collects, uses, and protects your personal information.'
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-gray-600">Effective date: 28 October 2024</p>

        <section className="mt-8 space-y-6 text-sm text-gray-700">
          <p>
            We respect your privacy and are committed to safeguarding personal information collected in connection with the
            Services. This Privacy Policy outlines how we gather, use, and disclose your data when you interact with
            BuyFromChina.ca.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">1. Information we collect</h2>
          <ul className="list-disc space-y-2 pl-4">
            <li>Contact information such as your name, email address, and shipping details.</li>
            <li>Quote details including product URLs, sizing notes, and reference pricing you provide.</li>
            <li>Payment confirmations and related order metadata from Stripe. We never receive or store full card numbers.</li>
            <li>Communication history when you contact support.</li>
          </ul>
          <h2 className="text-xl font-semibold text-gray-900">2. How we use information</h2>
          <p>We use personal information to:</p>
          <ul className="list-disc space-y-2 pl-4">
            <li>Generate quotes and fulfill procurement and logistics activities.</li>
            <li>Send transactional emails (quotes, payment confirmations, shipping updates).</li>
            <li>Improve our Services, prevent fraud, and comply with legal requirements.</li>
          </ul>
          <h2 className="text-xl font-semibold text-gray-900">3. Sharing information</h2>
          <p>
            We share information with trusted partners such as Stripe (payments), logistics providers, and communication
            platforms solely to deliver the Services. We do not sell your data to third parties.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">4. Data retention</h2>
          <p>
            We keep quotes and order records for as long as required to provide service support, comply with tax obligations,
            and maintain accurate financial records. You may request deletion of non-statutory information by contacting us.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">5. Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards to protect personal data, including encryption,
            access controls, and routine security reviews. However, no method of transmission or storage is completely secure.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">6. Your choices</h2>
          <p>
            You can opt-out of marketing communications, request a copy of your data, or ask us to correct inaccurate
            information by emailing{' '}
            <a href="mailto:support@buyfromchina.ca" className="text-primary">
              support@buyfromchina.ca
            </a>
            .
          </p>
          <h2 className="text-xl font-semibold text-gray-900">7. Updates</h2>
          <p>
            We may update this policy periodically. Changes will be posted on this page with a revised effective date.
            Material updates will be highlighted or communicated via email.
          </p>
        </section>
      </div>
    </div>
  );
}
