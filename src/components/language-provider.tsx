'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { defaultLocale, locales, messages, type Locale } from '@/i18n/messages';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: (typeof messages)[Locale];
  locales: typeof locales;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'buyfromchina-locale';

const resolveInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && messages[stored]) {
    return stored;
  }
  const browserLang = navigator.language.slice(0, 2);
  const match = locales.find((item) => item.code.startsWith(browserLang));
  return match?.code ?? defaultLocale;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        if (messages[next]) {
          setLocaleState(next);
        }
      },
      dictionary: messages[locale],
      locales
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
