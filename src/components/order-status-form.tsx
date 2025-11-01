'use client';

import { useTransition } from 'react';
import { useFormState } from 'react-dom';
import { updateOrderStatus, type OrderUpdateState } from '@/app/admin/(dashboard)/orders/[id]/actions';
import { ORDER_STATUSES } from '@/lib/types';

const initialState: OrderUpdateState = {};

export function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [state, formAction] = useFormState(updateOrderStatus, initialState);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        formData.set('orderId', orderId);
        startTransition(() => {
          formAction(formData);
        });
      }}
      className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <label className="block text-sm font-medium text-gray-700">
        Status
        <select
          name="status"
          defaultValue={currentStatus}
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? 'Updating…' : 'Update status'}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Order updated.</p>}
    </form>
  );
}
