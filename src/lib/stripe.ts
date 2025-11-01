import Stripe from 'stripe';
import { env } from '@/env';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
  appInfo: {
    name: 'BuyFromChina.ca',
    version: '1.0.0'
  }
});

export const buildCheckoutLineItems = (params: { quoteId: string; total: number }) => [
  {
    price_data: {
      currency: 'cad',
      product_data: {
        name: `BuyFromChina.ca Quote ${params.quoteId}`
      },
      unit_amount: Math.round(params.total * 100)
    },
    quantity: 1
  }
];
