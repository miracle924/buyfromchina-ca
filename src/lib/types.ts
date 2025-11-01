export const QUOTE_SIZES = ['SMALL', 'MEDIUM', 'LARGE'] as const;
export type QuoteSizeOption = (typeof QUOTE_SIZES)[number];

export const QUOTE_STATUSES = ['NEW', 'SENT', 'APPROVED', 'PAID', 'CANCELLED'] as const;
export type QuoteStatusOption = (typeof QUOTE_STATUSES)[number];

export const ORDER_STATUSES = ['PENDING', 'PAID', 'REFUNDED', 'FAILED'] as const;
export type OrderStatusOption = (typeof ORDER_STATUSES)[number];
