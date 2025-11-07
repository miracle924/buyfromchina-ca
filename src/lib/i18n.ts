import { cookies, headers } from 'next/headers';
import { defaultLocale, locales, messages, type Locale } from '@/i18n/messages';

export const LOCALE_COOKIE = 'buyfromchina-locale';

const isSupportedLocale = (value: string | undefined): value is Locale =>
  Boolean(value && locales.some((locale) => locale.code === value));

const parseAcceptLanguage = (value: string | null): Locale | undefined => {
  if (!value) return undefined;
  const candidates = value
    .split(',')
    .map((part) => part.split(';')[0]?.trim())
    .filter(Boolean);
  for (const candidate of candidates) {
    const normalized = candidate.slice(0, 2).toLowerCase();
    const match = locales.find((locale) => locale.code.startsWith(normalized));
    if (match) return match.code;
  }
  return undefined;
};

export const detectLocale = (): Locale => {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerLocale = parseAcceptLanguage(headers().get('accept-language'));
  if (headerLocale) return headerLocale;

  return defaultLocale;
};

export const getDictionary = (locale: Locale = detectLocale()) => messages[locale] ?? messages[defaultLocale];
