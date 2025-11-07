'use client';

import { useLanguage } from '@/components/language-provider';

type DisclaimerBannerProps = {
  className?: string;
};

export default function DisclaimerBanner({ className = '' }: DisclaimerBannerProps) {
  const { dictionary } = useLanguage();
  return (
    <div
      role="note"
      aria-label="Disclaimer"
      className={`rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 ${className}`}
    >
      <p>{dictionary.disclaimer}</p>
    </div>
  );
}
