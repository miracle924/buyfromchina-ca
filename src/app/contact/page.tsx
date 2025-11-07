import type { Metadata } from 'next';
import ContactPageContent from './client-content';

export const metadata: Metadata = {
  title: 'Contact us | BuyFromChina.ca',
  description: 'Questions about importing from Taobao or Tmall? Reach out to the BuyFromChina.ca team for support.'
};

export default function ContactPage() {
  return <ContactPageContent />;
}
