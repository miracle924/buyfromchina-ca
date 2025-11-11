import { QuoteSize } from '@prisma/client';

export const PRICING_VERSION = 'MANUAL-REVIEW';

const DEFAULT_REFERENCE_PRICE: Record<QuoteSize, number> = {
  SMALL: 75,
  MEDIUM: 120,
  LARGE: 220
};

const SERVICE_FEE_RATE = 0.12;

const MIN_SERVICE_FEE: Record<QuoteSize, number> = {
  SMALL: 9,
  MEDIUM: 14,
  LARGE: 26
};

const SHIPPING_BASE: Record<QuoteSize, number> = {
  SMALL: 12.99,
  MEDIUM: 15.99,
  LARGE: 24.99
};

const REMOTE_POSTAL_PREFIXES = new Set(['X', 'Y']);
const REMOTE_SHIPPING_SURCHARGE = 8.5;

// Canada sales tax is collected directly by the marketplace, so we keep quotes tax-free here.
const TAX_RATE = 0;

export type PricingBreakdown = {
  itemCostCad: number;
  serviceFeeCad: number;
  shippingCad: number;
  taxCad: number;
  totalCad: number;
};

type CalculatePricingArgs = {
  productURL: string;
  size: QuoteSize;
  postalCode: string;
  referencePrice?: number;
};

const toCurrency = (value: number): number => Math.floor((value + Number.EPSILON) * 100) / 100;

const deriveItemCost = (size: QuoteSize, referencePrice?: number): number => {
  if (referencePrice && Number.isFinite(referencePrice) && referencePrice > 0) {
    return toCurrency(referencePrice);
  }

  return toCurrency(DEFAULT_REFERENCE_PRICE[size]);
};

const deriveServiceFee = (size: QuoteSize, itemCost: number): number => {
  const calculated = itemCost * SERVICE_FEE_RATE;
  return toCurrency(Math.max(calculated, MIN_SERVICE_FEE[size]));
};

const deriveShipping = (size: QuoteSize, postalCode: string): number => {
  const base = SHIPPING_BASE[size];
  const isRemote = REMOTE_POSTAL_PREFIXES.has(postalCode[0] ?? '');
  const surcharge = isRemote ? REMOTE_SHIPPING_SURCHARGE : 0;

  return toCurrency(base + surcharge);
};

export const calculatePricing = ({ size, postalCode, referencePrice }: CalculatePricingArgs): PricingBreakdown => {
  const normalizedPostalCode = postalCode.trim().toUpperCase();

  const itemCostCad = deriveItemCost(size, referencePrice);
  const serviceFeeCad = deriveServiceFee(size, itemCostCad);
  const shippingCad = deriveShipping(size, normalizedPostalCode);
  const taxBase = itemCostCad + serviceFeeCad + shippingCad;
  const taxCad = toCurrency(taxBase * TAX_RATE);
  const totalCad = toCurrency(itemCostCad + serviceFeeCad + shippingCad + taxCad);

  return {
    itemCostCad,
    serviceFeeCad,
    shippingCad,
    taxCad,
    totalCad
  };
};
