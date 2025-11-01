'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { submitContact, type ContactState } from '@/app/contact/actions';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Enter a valid email address.'),
  message: z.string().min(10, 'Tell us how we can help.').max(2000, 'Message is too long.')
});

type FormValues = z.infer<typeof schema>;

const initialState: ContactState = {};

export function ContactForm() {
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
      setStatus('Thanks! Your message is on the way.');
      reset();
    } else if (state.error) {
      setStatus(state.error);
    }
  }, [reset, state]);

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
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Jane Doe"
        />
        {fieldError('name') && <p className="mt-1 text-sm text-red-600">{fieldError('name')}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="you@email.com"
        />
        {fieldError('email') && <p className="mt-1 text-sm text-red-600">{fieldError('email')}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Share details about your request."
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
        {isPending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
