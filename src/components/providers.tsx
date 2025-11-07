'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/components/language-provider';
import type { Locale } from '@/i18n/messages';

type ProvidersProps = {
  children: ReactNode;
  initialLocale: Locale;
};

export function Providers({ children, initialLocale }: ProvidersProps) {
  return <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>;
}
