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
  taxCad: number;
  totalCad: number;
  status: string;
};

const initialState: QuoteUpdateState = {};

export function QuoteEditForm({ quote }: { quote: QuoteEditable }) {
  const [state, formAction] = useFormState(updateQuote, initialState);
  const [isPending, startTransition] = useTransition();
  const [itemCost, setItemCost] = useState<number>(quote.itemCostCad);
  const [serviceFee, setServiceFee] = useState<number>(quote.serviceFeeCad);
  const [shipping, setShipping] = useState<number>(quote.shippingCad);
  const [tax, setTax] = useState<number>(quote.taxCad);
  const [total, setTotal] = useState<number>(quote.totalCad);

  useEffect(() => {
    const calculatedServiceFee = Math.round(itemCost * 0.15 * 100) / 100;
    setServiceFee(calculatedServiceFee);
  }, [itemCost]);

  useEffect(() => {
    const taxableAmount = itemCost + serviceFee + shipping;
    const calculatedTax = Math.round(taxableAmount * 0.13 * 100) / 100;
    setTax(calculatedTax);
  }, [itemCost, serviceFee, shipping]);

  useEffect(() => {
    const newTotal = Math.round((itemCost + serviceFee + shipping + tax) * 100) / 100;
    setTotal(newTotal);
  }, [itemCost, serviceFee, shipping, tax]);

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
            onChange={(event) => setItemCost(Number(event.target.value) || 0)}
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
            onChange={(event) => setShipping(Number(event.target.value) || 0)}
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700">
          <span className="font-medium">Tax (CAD)</span>
          <input
            name="taxCad"
            value={tax}
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            readOnly
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
