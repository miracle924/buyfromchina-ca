import type { QuoteSize, QuoteStatus } from '@prisma/client';
import type { PricingBreakdown } from '@/lib/pricing';

export type QuoteSummary = {
  id: string;
  email: string;
  productURLs: string[];
  recipientName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  province: string;
  postalCode: string;
  notes: string | null;
  size: QuoteSize;
  attachments: string[];
  breakdown: PricingBreakdown;
  createdAt: string;
  status: QuoteStatus;
  conversionId?: string;
};

export type QuoteFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  quote?: QuoteSummary;
};
