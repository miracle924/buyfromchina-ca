'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { createQuote } from '@/app/quote/actions';
import type { QuoteFormState } from '@/types/quote';
import { QUOTE_SIZES, type QuoteSizeOption } from '@/lib/types';
import { normalizeProductUrlInput } from '@/lib/product-urls';
import { useLanguage } from '@/components/language-provider';

const quoteSizes = QUOTE_SIZES;

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

type FormValues = {
  productURLs: string;
  recipientName: string;
  email: string;
  postalCode: string;
  notes?: string;
  referencePrice?: string;
  size: QuoteSizeOption;
};

const initialState: QuoteFormState = {};

export function QuoteForm() {
  const { dictionary } = useLanguage();
  const copy = dictionary.quoteForm;
  const sizeLabels: Record<QuoteSizeOption, string> = {
    SMALL: copy.parcelSize.small,
    MEDIUM: copy.parcelSize.medium,
    LARGE: copy.parcelSize.large
  };
  const footerCopy = dictionary.footer;
  const referenceOptions = useMemo(
    () => [
      { id: 'under50', label: copy.referencePrice.ranges.under50, value: 25 },
      { id: '50-100', label: copy.referencePrice.ranges.fiftyToHundred, value: 75 },
      { id: '100-150', label: copy.referencePrice.ranges.hundredToOneFifty, value: 125 },
      { id: '150-200', label: copy.referencePrice.ranges.oneFiftyToTwoHundred, value: 175 },
      { id: '200-250', label: copy.referencePrice.ranges.twoHundredToTwoFifty, value: 225 },
      { id: 'custom', label: copy.referencePrice.customLabel, value: null }
    ],
    [copy.referencePrice.customLabel, copy.referencePrice.ranges]
  );
  const schema = useMemo(
    () =>
      z.object({
        productURLs: z
          .string()
          .transform((value) => normalizeProductUrlInput(value))
          .refine(
            (urls) => urls.length === 0 || urls.every((url) => isValidUrl(url)),
            { message: copy.zod.urlsInvalid }
          ),
        recipientName: z
          .string()
          .trim()
          .min(2, copy.zod.recipientName)
          .transform((value) => value.trim()),
        email: z.string().email(copy.zod.email),
        postalCode: z
          .string()
          .transform((value) => value.trim().toUpperCase())
          .refine((value) => /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/.test(value), copy.zod.postalCode),
        notes: z.string().max(1500, copy.zod.notes).optional(),
        referencePrice: z
          .string()
          .optional()
          .refine((value) => {
            if (!value) return true;
            const val = Number(value);
            return Number.isFinite(val) && val > 0 && val <= 250;
          }, copy.zod.referencePrice),
        size: z.enum(QUOTE_SIZES, {
          errorMap: () => ({ message: copy.zod.size })
        })
      }),
    [
      copy.zod.email,
      copy.zod.notes,
      copy.zod.postalCode,
      copy.zod.recipientName,
      copy.zod.referencePrice,
      copy.zod.size,
      copy.zod.urlsInvalid
    ]
  );
  const formatAttachmentMessage = (count: number) =>
    copy.status.successAttachments.replace('{{count}}', String(count));

  const [state, formAction] = useFormState(createQuote, initialState);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [productUrls, setProductUrls] = useState<string[]>(['']);
  const [referenceSelection, setReferenceSelection] = useState('');
  const [customReference, setCustomReference] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const attachmentInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const attachmentIdRef = useRef(0);
  const getNextAttachmentId = () => {
    attachmentIdRef.current += 1;
    return `attachment-${attachmentIdRef.current}`;
  };
  const [attachmentFields, setAttachmentFields] = useState<string[]>(() => [getNextAttachmentId()]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      size: 'MEDIUM',
      productURLs: '',
      recipientName: '',
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
        email: '',
        postalCode: ''
      });
      setStatusMessage(copy.server.success);
      setProductUrls(['']);
      setReferenceSelection('');
      setCustomReference('');
      Object.values(attachmentInputRefs.current).forEach((input) => {
        if (input) {
          input.value = '';
        }
      });
      attachmentInputRefs.current = {};
      attachmentIdRef.current += 1;
      setAttachmentFields([`attachment-${attachmentIdRef.current}`]);
    } else if (state.error) {
      setStatusMessage(state.error);
    }
  }, [copy.server.success, reset, state]);

  const onSubmit = handleSubmit((_values, event) => {
    setStatusMessage(copy.status.submitting);
    const formElement = (event?.currentTarget ?? formRef.current) as HTMLFormElement | null;
    if (!formElement) return;
    const formData = new FormData(formElement);

    startTransition(() => {
      formAction(formData);
    });
  });

  const fieldError = (name: keyof FormValues) => errors[name]?.message ?? state.fieldErrors?.[name as string];
  const productUrlsValue = productUrls.map((url) => url.trim()).filter(Boolean).join('\n');
  const isCustomReference = referenceSelection === 'custom';

  useEffect(() => {
    setValue('productURLs', productUrlsValue, {
      shouldDirty: productUrlsValue.length > 0,
      shouldValidate: true
    });
  }, [productUrlsValue, setValue]);

  const updateProductUrl = (index: number, value: string) => {
    setProductUrls((prev) => prev.map((url, idx) => (idx === index ? value : url)));
  };

  const addProductUrlField = () => {
    setProductUrls((prev) => [...prev, '']);
  };

  const removeProductUrlField = (index: number) => {
    setProductUrls((prev) => {
      if (prev.length === 1) {
        return [''];
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const addAttachmentField = () => {
    setAttachmentFields((prev) => [...prev, getNextAttachmentId()]);
  };

  const handleReferenceSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setReferenceSelection(value);
    if (value === 'custom') {
      setValue('referencePrice', customReference, { shouldDirty: true, shouldValidate: true });
      return;
    }
    if (value === '') {
      setValue('referencePrice', '', { shouldDirty: true, shouldValidate: true });
      setCustomReference('');
      return;
    }
    const option = referenceOptions.find((opt) => opt.id === value && opt.value);
    if (option?.value) {
      setCustomReference('');
      setValue('referencePrice', String(option.value), { shouldDirty: true, shouldValidate: true });
    }
  };

  const handleCustomReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    if (rawValue === '') {
      setCustomReference('');
      setValue('referencePrice', '', { shouldDirty: true, shouldValidate: true });
      return;
    }
    const numericValue = Number(rawValue);
    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      setCustomReference(rawValue);
      return;
    }
    const cappedValue = Math.min(numericValue, 250);
    const formattedValue = String(cappedValue);
    setCustomReference(formattedValue);
    setValue('referencePrice', formattedValue, { shouldDirty: true, shouldValidate: true });
  };

  const removeAttachmentField = (id: string) => {
    setAttachmentFields((prev) => {
      if (prev.length === 1) {
        return prev;
      }
      const next = prev.filter((fieldId) => fieldId !== id);
      const input = attachmentInputRefs.current[id];
      if (input) {
        input.value = '';
      }
      delete attachmentInputRefs.current[id];
      return next;
    });
  };

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
          <label htmlFor="productURLs-0" className="block text-sm font-medium text-gray-700">
            {copy.urlsLabel} <span className="text-gray-400">{copy.optionalHint}</span>
          </label>
          <div className="mt-2 flex flex-col gap-3">
            {productUrls.map((url, index) => (
              <div key={`product-url-${index}`} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  id={`productURLs-${index}`}
                  type="url"
                  inputMode="url"
                  value={url}
                  onChange={(event) => updateProductUrl(index, event.target.value)}
                  placeholder="https://item.taobao.com/item.htm?id=..."
                  className="w-full flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <div className="flex items-center gap-2">
                  {index === productUrls.length - 1 && (
                    <button
                      type="button"
                      onClick={addProductUrlField}
                      className="btn-secondary whitespace-nowrap px-4 py-2 text-sm"
                    >
                      {copy.addUrl}
                    </button>
                  )}
                  {productUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProductUrlField(index)}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-500 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {copy.remove}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <input type="hidden" value={productUrlsValue} {...register('productURLs')} />
          <p className="mt-1 text-xs text-gray-500">{copy.urlsHint}</p>
          {fieldError('productURLs') && <p className="mt-1 text-sm text-red-600">{fieldError('productURLs')}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
              {copy.recipientName.label}
            </label>
            <input
              id="recipientName"
              type="text"
              autoComplete="name"
              {...register('recipientName')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder={copy.recipientName.placeholder}
            />
            {fieldError('recipientName') && <p className="mt-1 text-sm text-red-600">{fieldError('recipientName')}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {copy.email.label}
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder={copy.email.placeholder}
            />
            {fieldError('email') && <p className="mt-1 text-sm text-red-600">{fieldError('email')}</p>}
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              {copy.postalCode.label}
            </label>
            <input
              id="postalCode"
              type="text"
              {...register('postalCode')}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm uppercase tracking-wide focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder={copy.postalCode.placeholder}
              />
            {fieldError('postalCode') && <p className="mt-1 text-sm text-red-600">{fieldError('postalCode')}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            {copy.notes.label} <span className="text-gray-400">{copy.optionalHint}</span>
          </label>
          <textarea
            id="notes"
            rows={4}
            {...register('notes')}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={copy.notes.placeholder}
        />
        {fieldError('notes') && <p className="mt-1 text-sm text-red-600">{fieldError('notes')}</p>}
      </div>

        <div>
          <label htmlFor={attachmentFields[0] ?? 'attachments'} className="block text-sm font-medium text-gray-700">
            {copy.attachments.label} <span className="text-gray-400">{copy.optionalHint}</span>
          </label>
          <div className="mt-2 flex flex-col gap-3">
            {attachmentFields.map((id, index) => (
              <div key={id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  id={id}
                  name="attachments"
                  type="file"
                  accept="image/png,image/jpeg"
                  ref={(element) => {
                    if (element) {
                      attachmentInputRefs.current[id] = element;
                    } else {
                      delete attachmentInputRefs.current[id];
                    }
                  }}
                  className="w-full flex-1 cursor-pointer text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90"
                />
                <div className="flex items-center gap-2">
                  {index === attachmentFields.length - 1 && attachmentFields.length < 5 && (
                    <button
                      type="button"
                      onClick={addAttachmentField}
                      className="btn-secondary whitespace-nowrap px-4 py-2 text-sm"
                    >
                      {copy.attachments.add}
                    </button>
                  )}
                  {attachmentFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAttachmentField(id)}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-500 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {copy.remove}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">{copy.attachments.hint}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="referencePricePreset" className="block text-sm font-medium text-gray-700">
              {copy.referencePrice.label}
            </label>
            <select
              id="referencePricePreset"
              value={referenceSelection}
              onChange={handleReferenceSelection}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">{copy.referencePrice.placeholder}</option>
              {referenceOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {isCustomReference ? (
              <input
                type="number"
                min={1}
                max={250}
                step="0.01"
                value={customReference}
                onChange={handleCustomReferenceChange}
                onInput={handleCustomReferenceChange}
                placeholder={copy.referencePrice.customPlaceholder}
                className="mt-3 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            ) : null}
            <input type="hidden" {...register('referencePrice')} />
            <p className="mt-2 text-xs text-gray-500">{copy.referencePrice.hint}</p>
            {fieldError('referencePrice') && (
              <p className="mt-1 text-sm text-red-600">{fieldError('referencePrice')}</p>
            )}
          </div>
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">{copy.parcelSize.legend}</legend>
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
            {copy.termsNotice}{' '}
            <a href="/legal/terms" className="text-primary hover:text-primary/80">
              {footerCopy.terms}
            </a>
            .
          </p>
          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isPending} aria-disabled={isPending}>
            {isPending ? copy.submit.pending : copy.submit.idle}
          </button>
        </div>
        <div aria-live="polite" className="text-sm text-gray-600">
          {statusMessage}
        </div>
        {state.error && !isPending && <p className="text-sm text-red-600">{state.error}</p>}
      </form>

      {state.success && state.quote ? (
        <section aria-live="polite" className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-sm text-green-900 shadow-sm">
          <h2 className="text-base font-semibold">{copy.status.successTitle}</h2>
          <p className="mt-2">{copy.status.successBody}</p>
          {state.quote.attachments.length > 0 ? (
            <p className="mt-2">{formatAttachmentMessage(state.quote.attachments.length)}</p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
