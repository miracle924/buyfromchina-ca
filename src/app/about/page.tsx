import type { Metadata } from 'next';
import AboutPageContent from './client-content';

export const metadata: Metadata = {
  title: 'About BuyFromChina.ca | Meet the Team Bringing Taobao to Canada',
  description:
    'Learn how BuyFromChina.ca helps Canadians import Taobao and Tmall finds with white-glove concierge service, transparent pricing, and trusted logistics.'
};

export default function AboutPage() {
  return <AboutPageContent />;
}
