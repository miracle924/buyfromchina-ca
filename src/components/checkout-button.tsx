'use client';

import { useTransition } from 'react';
import { useFormState } from 'react-dom';
import { createCheckoutSession, type CheckoutState } from '@/app/checkout/[quoteId]/actions';

const initialState: CheckoutState = {};

export function CheckoutButton({ quoteId }: { quoteId: string }) {
  const [state, formAction] = useFormState(createCheckoutSession, initialState);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <form
        action={(formData) => {
          formData.append('quoteId', quoteId);
          startTransition(() => {
            formAction(formData);
          });
        }}
      >
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isPending} aria-disabled={isPending}>
          {isPending ? 'Redirecting to Stripe…' : 'Confirm & pay with Stripe'}
        </button>
      </form>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </div>
  );
}
