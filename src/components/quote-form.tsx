'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { createQuote } from '@/app/quote/actions';
import type { QuoteFormState } from '@/types/quote';
import { QUOTE_SIZES, type QuoteSizeOption } from '@/lib/types';
import { normalizeProductUrlInput } from '@/lib/product-urls';

const quoteSizes = QUOTE_SIZES;

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const schema = z.object({
  productURLs: z
    .string()
    .transform((value) => normalizeProductUrlInput(value))
    .refine(
      (urls) => urls.length === 0 || urls.every((url) => isValidUrl(url)),
      { message: 'Enter valid Taobao or Tmall URLs. Use a new line for each link.' }
    ),
  recipientName: z
    .string()
    .trim()
    .min(2, 'Enter the recipient name.')
    .transform((value) => value.trim()),
  addressLine1: z
    .string()
    .trim()
    .min(5, 'Enter the street address.')
    .transform((value) => value.trim()),
  addressLine2: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  city: z
    .string()
    .trim()
    .min(2, 'Enter a city.')
    .transform((value) => value.trim()),
  province: z
    .string()
    .trim()
    .min(2, 'Enter a province or territory.')
    .transform((value) => value.trim().toUpperCase()),
  email: z.string().email('Enter a valid email address.'),
  postalCode: z
    .string()
    .min(6, 'Enter a postal code.')
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Use a valid Canadian postal code.'),
  notes: z.string().max(1500, 'Notes must be at most 1500 characters.').optional(),
  referencePrice: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      const val = Number(value);
      return Number.isFinite(val) && val > 0;
    }, 'Reference price must be a positive number.'),
  size: z.enum(QUOTE_SIZES, {
    errorMap: () => ({ message: 'Select an estimated parcel size.' })
  })
});

type FormValues = z.input<typeof schema>;

const initialState: QuoteFormState = {};

const sizeLabels: Record<QuoteSizeOption, string> = {
  SMALL: 'Small (accessories, light items)',
  MEDIUM: 'Medium (shoes, hoodies, tech)',
  LARGE: 'Large (jackets, bulk orders)'
};

export function QuoteForm() {
  const [state, formAction] = useFormState(createQuote, initialState);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      size: 'MEDIUM',
      productURLs: '',
      recipientName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      email: '',
      postalCode: ''
    }
  });

  useEffect(() => {
    if (state.success && state.quote) {
      reset({
        size: state.quote.size,
        productURLs: '',
        recipientName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        email: '',
        postalCode: ''
      });
      setStatusMessage('Request received! We will email a quote soon.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else if (state.error) {
      setStatusMessage(state.error);
    }
  }, [reset, state]);

  const onSubmit = handleSubmit((_values, event) => {
    setStatusMessage('Submitting quote request…');
    const formElement = (event?.currentTarget ?? formRef.current) as HTMLFormElement | null;
    if (!formElement) return;
    const formData = new FormData(formElement);

    startTransition(() => {
      formAction(formData);
    });
  });

  const fieldError = (name: keyof FormValues) => errors[name]?.message ?? state.fieldErrors?.[name as string];

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
        encType="multipart/form-data"
        className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
      >
        <div>
          <label htmlFor="productURLs" className="block text-sm font-medium text-gray-700">
            Taobao / Tmall product URLs <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="productURLs"
            rows={3}
            {...register('productURLs')}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={`https://item.taobao.com/item.htm?id=...\nhttps://detail.tmall.com/item.htm?...`}
          />
          <p className="mt-1 text-xs text-gray-500">Enter one product link per line if you need multiple items.</p>
          {fieldError('productURLs') && <p className="mt-1 text-sm text-red-600">{fieldError('productURLs')}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
              Recipient name
            </label>
            <input
              id="recipientName"
              type="text"
              autoComplete="name"
              {...register('recipientName')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Full name"
            />
            {fieldError('recipientName') && <p className="mt-1 text-sm text-red-600">{fieldError('recipientName')}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
              Street address
            </label>
            <input
              id="addressLine1"
              type="text"
              autoComplete="address-line1"
              {...register('addressLine1')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="123 Example Street"
            />
            {fieldError('addressLine1') && <p className="mt-1 text-sm text-red-600">{fieldError('addressLine1')}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
              Apartment, suite, etc. <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="addressLine2"
              type="text"
              autoComplete="address-line2"
              {...register('addressLine2')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Unit 5B"
            />
            {fieldError('addressLine2') && <p className="mt-1 text-sm text-red-600">{fieldError('addressLine2')}</p>}
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
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              {...register('city')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Toronto"
            />
            {fieldError('city') && <p className="mt-1 text-sm text-red-600">{fieldError('city')}</p>}
          </div>
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">
              Province / Territory
            </label>
            <input
              id="province"
              type="text"
              autoComplete="address-level1"
              {...register('province')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm uppercase focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="ON"
              maxLength={30}
            />
            {fieldError('province') && <p className="mt-1 text-sm text-red-600">{fieldError('province')}</p>}
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              Canadian postal code
            </label>
            <input
              id="postalCode"
              type="text"
              {...register('postalCode')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm uppercase tracking-wide focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="M5V 2T6"
              />
            {fieldError('postalCode') && <p className="mt-1 text-sm text-red-600">{fieldError('postalCode')}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="notes"
            rows={4}
            {...register('notes')}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Provide size preferences, reference photos, seller options, etc."
        />
        {fieldError('notes') && <p className="mt-1 text-sm text-red-600">{fieldError('notes')}</p>}
      </div>

        <div>
          <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
            Reference images <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="attachments"
            name="attachments"
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            multiple
            className="mt-2 block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90"
          />
          <p className="mt-1 text-xs text-gray-500">Up to 5 PNG or JPEG images, max 15MB each.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="referencePrice" className="block text-sm font-medium text-gray-700">
              Reference price in CAD (optional)
            </label>
            <input
              id="referencePrice"
              type="number"
              min={1}
              step="0.01"
              {...register('referencePrice')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="e.g. 89.99"
            />
            {fieldError('referencePrice') && (
              <p className="mt-1 text-sm text-red-600">{fieldError('referencePrice')}</p>
            )}
          </div>
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">Estimated parcel size</legend>
              <div className="mt-2 space-y-3">
                {quoteSizes.map((size) => (
                  <label
                    key={size}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm shadow-sm transition hover:border-primary/60 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40"
                  >
                    <input
                      type="radio"
                      value={size}
                      {...register('size')}
                      className="mt-1 h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>
                      <span className="block font-semibold text-gray-900">{size}</span>
                      <span className="text-gray-600">{sizeLabels[size]}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            {fieldError('size') && <p className="mt-1 text-sm text-red-600">{fieldError('size')}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            We respond within 12 hours. By submitting, you agree to our{' '}
            <a href="/legal/terms" className="text-primary hover:text-primary/80">
              Terms of Service
            </a>
            .
          </p>
          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isPending} aria-disabled={isPending}>
            {isPending ? 'Submitting…' : 'Send request'}
          </button>
        </div>
        <div aria-live="polite" className="text-sm text-gray-600">
          {statusMessage}
        </div>
        {state.error && !isPending && <p className="text-sm text-red-600">{state.error}</p>}
      </form>

      {state.success && state.quote ? (
        <section aria-live="polite" className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-sm text-green-900 shadow-sm">
          <h2 className="text-base font-semibold">We received your request.</h2>
          <p className="mt-2">Our team will review the item and email you a detailed quote shortly.</p>
          {state.quote.attachments.length > 0 ? (
            <p className="mt-2">Attachment count: {state.quote.attachments.length}. We will reference these images when preparing pricing.</p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
