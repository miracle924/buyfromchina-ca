import type { Metadata } from 'next';
import FaqPageContent from './client-content';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | BuyFromChina.ca',
  description: 'Answers about our Taobao/Tmall procurement service, pricing, payments, and delivery timelines for Canada.'
};

export default function FaqPage() {
  return <FaqPageContent />;
}
