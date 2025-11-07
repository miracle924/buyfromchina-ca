'use client';

import { useLanguage } from '@/components/language-provider';

export function LanguageSwitcher() {
  const { locale, setLocale, locales, dictionary } = useLanguage();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <span className="sr-only sm:not-sr-only">{dictionary.languageSwitcher.label}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-label={dictionary.languageSwitcher.label}
      >
        {locales.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
