'use client';

import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export function CopyButton({ value, label = 'Copy link', className }: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setStatus('copied');
          setTimeout(() => setStatus('idle'), 2000);
        } catch (error) {
          console.error('Failed to copy to clipboard', error);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 2000);
        }
      }}
      className={clsx(
        'inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className
      )}
    >
      {status === 'copied' ? 'Copied!' : status === 'error' ? 'Copy failed' : label}
    </button>
  );
}
