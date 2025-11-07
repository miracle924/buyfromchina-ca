import type { Metadata } from 'next';
import QuotePageContent from './client-content';

export const metadata: Metadata = {
  title: 'Request a Quote | BuyFromChina.ca',
  description:
    'Request a fully transparent Taobao/Tmall quote in Canadian dollars. We validate the listing, estimate shipping, and email you the breakdown.'
};

export default function QuotePage() {
  return <QuotePageContent />;
}
