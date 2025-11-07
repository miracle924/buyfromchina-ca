'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { submitContact, type ContactState } from '@/app/contact/actions';
import { useLanguage } from '@/components/language-provider';

const initialState: ContactState = {};

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const { dictionary } = useLanguage();
  const copy = dictionary.contactForm;
  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, copy.errors.nameRequired)
          .max(80, copy.errors.nameMax),
        email: z.string().email(copy.errors.emailInvalid),
        message: z
          .string()
          .min(10, copy.errors.messageMin)
          .max(2000, copy.errors.messageMax)
      }),
    [copy.errors.emailInvalid, copy.errors.messageMax, copy.errors.messageMin, copy.errors.nameMax, copy.errors.nameRequired]
  );

  const [state, formAction] = useFormState(submitContact, initialState);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (state.success) {
      setStatus(copy.status.success);
      reset();
    } else if (state.error) {
      setStatus(state.error);
    }
  }, [copy.status.success, reset, state]);

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    startTransition(() => {
      formAction(formData);
    });
  });

  const fieldError = (field: keyof FormValues) => state.fieldErrors?.[field] ?? errors[field]?.message;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
      className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {copy.labels.name}
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder={copy.placeholders.name}
        />
        {fieldError('name') && <p className="mt-1 text-sm text-red-600">{fieldError('name')}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {copy.labels.email}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder={copy.placeholders.email}
        />
        {fieldError('email') && <p className="mt-1 text-sm text-red-600">{fieldError('email')}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {copy.labels.message}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder={copy.placeholders.message}
        />
        {fieldError('message') && <p className="mt-1 text-sm text-red-600">{fieldError('message')}</p>}
      </div>

      <div
        aria-live="polite"
        role="status"
        className={`min-h-[1.5rem] text-sm ${
          status ? (state.success ? 'text-green-600' : 'text-red-600') : 'text-gray-600'
        }`}
      >
        {status}
      </div>

      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? copy.button.sending : copy.button.idle}
      </button>
    </form>
  );
}
