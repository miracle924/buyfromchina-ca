'use client';

import { useTransition, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { updateQuote, type QuoteUpdateState } from '@/app/admin/(dashboard)/quotes/[id]/actions';

const statuses = ['NEW', 'SENT', 'APPROVED', 'PAID', 'CANCELLED'] as const;

type QuoteEditable = {
  id: string;
  itemCostCad: number;
  serviceFeeCad: number;
  shippingCad: number;
  totalCad: number;
  status: string;
};

const initialState: QuoteUpdateState = {};

const toNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toCurrencyString = (value: number): string => (Math.round(value * 100) / 100).toFixed(2);

const toInputString = (value: number): string => (Number.isFinite(value) ? value.toString() : '0');

export function QuoteEditForm({ quote }: { quote: QuoteEditable }) {
  const [state, formAction] = useFormState(updateQuote, initialState);
  const [isPending, startTransition] = useTransition();
  const [itemCost, setItemCost] = useState<string>(toInputString(quote.itemCostCad));
  const [serviceFee, setServiceFee] = useState<string>(toCurrencyString(quote.serviceFeeCad));
  const [shipping, setShipping] = useState<string>(toInputString(quote.shippingCad));
  const [total, setTotal] = useState<string>(toCurrencyString(quote.totalCad));

  useEffect(() => {
    const nextServiceFee = toCurrencyString(toNumber(itemCost) * 0.15);
    if (nextServiceFee !== serviceFee) {
      setServiceFee(nextServiceFee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCost]);

  useEffect(() => {
    const cost = toNumber(itemCost);
    const fee = toNumber(serviceFee);
    const shippingAmount = toNumber(shipping);
    const nextTotal = toCurrencyString(cost + fee + shippingAmount);
    if (nextTotal !== total) {
      setTotal(nextTotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCost, serviceFee, shipping]);

  return (
    <form
      action={(formData) => {
        formData.set('quoteId', quote.id);
        startTransition(() => {
          formAction(formData);
        });
      }}
      className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-700">
          <span className="font-medium">Item cost (CAD)</span>
          <input
            name="itemCostCad"
            value={itemCost}
            onChange={(event) => setItemCost(event.target.value)}
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700">
          <span className="font-medium">Service fee (CAD)</span>
          <input
            name="serviceFeeCad"
            value={serviceFee}
            readOnly
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700">
          <span className="font-medium">Shipping (CAD)</span>
          <input
            name="shippingCad"
            value={shipping}
            onChange={(event) => setShipping(event.target.value)}
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700 sm:col-span-2">
          <span className="font-medium">Total (CAD)</span>
          <input
            name="totalCad"
            value={total}
            readOnly
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700 sm:col-span-2">
          <span className="font-medium">Status</span>
          <select
            name="status"
            defaultValue={quote.status}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Any changes are saved immediately and logged with an audit trail.</span>
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Quote updated.</p>}
    </form>
  );
}
