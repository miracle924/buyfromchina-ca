import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | BuyFromChina.ca',
  description: 'Review the terms governing the BuyFromChina.ca Taobao and Tmall procurement service.'
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-sm text-gray-600">Effective date: 28 October 2024</p>

        <section className="mt-8 space-y-6 text-sm text-gray-700">
          <p>
            BuyFromChina.ca (“we”, “us”, “our”) provides procurement and logistics services to customers located in Canada
            who wish to purchase items from Taobao, Tmall, and other Chinese marketplaces (“Services”). By requesting a
            quote or submitting payment you agree to these Terms of Service.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">1. Quotes &amp; pricing</h2>
          <p>
            Quotes are valid for 48 hours unless otherwise stated. Pricing includes the product cost (converted to CAD), a
            service fee, international shipping, and applicable taxes. We reserve the right to adjust quotes if the seller
            changes pricing, availability, or shipping terms before payment is received. Where adjustments are required we
            will notify you and request approval before proceeding.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">2. Payment</h2>
          <p>
            Payments are processed through Stripe. We do not store your credit card information. Orders are confirmed and
            placed with sellers only after successful payment. If payment is not received within the quote validity window,
            the quote may be cancelled or recalculated.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">3. Cancellations &amp; refunds</h2>
          <p>
            Once an order has been placed with a seller, cancellations are not guaranteed. Where the seller approves a
            cancellation or issues a refund, we will pass the refund back to you minus any non-recoverable costs (e.g.,
            bank fees, domestic shipping). If an item arrives damaged or materially different than described, contact us
            within 3 days of delivery and we will work with the seller to secure a remedy.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Third-Party Products &amp; No-Return Policy</h2>
          <p>
            BuyFromChina.ca provides a purchasing and forwarding service to help customers in Canada order products
            directly from third-party sellers on Taobao/Tmall and other Chinese marketplaces. We are not the manufacturer
            or seller of these products and therefore do not make any representations or warranties (express or implied)
            regarding product quality, performance, safety, fitness for a particular purpose, or merchantability.
          </p>
          <p>
            While we make reasonable efforts to source items from listings with positive ratings and reviews, final
            responsibility for product selection rests with the customer. Please review the seller’s description, photos,
            sizing charts, ratings, and comments before you place an order.
          </p>
          <p>
            All orders are final once placed. No returns, exchanges, or refunds are provided by BuyFromChina.ca for reasons
            including—but not limited to—size, color, fit, change of mind, or general dissatisfaction. If an item arrives
            damaged or not as described, we can assist you in contacting the marketplace seller to seek a resolution, but
            outcomes are not guaranteed and may be subject to the seller’s policies and platform rules.
          </p>
          <p>By placing an order, you acknowledge and agree to the above terms.</p>
          <h2 className="text-xl font-semibold text-gray-900">4. Customs &amp; duties</h2>
          <p>
            We handle customs documentation and remittance of duties and taxes based on information supplied by the seller
            and you. You are responsible for providing accurate delivery information. While uncommon, customs inspections
            may introduce delays outside our control.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">5. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, our liability for any claim arising from the Services is limited to the
            amount you paid for the applicable order. We are not liable for incidental, indirect, or consequential damages.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">6. Changes</h2>
          <p>
            We may update these Terms from time to time. Material changes will be communicated via email or on our website.
            Continued use of the Services after a change constitutes acceptance of the updated Terms.
          </p>
          <p>
            Questions about these Terms can be sent to{' '}
            <a href="mailto:support@buyfromchina.ca" className="text-primary">
              support@buyfromchina.ca
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
