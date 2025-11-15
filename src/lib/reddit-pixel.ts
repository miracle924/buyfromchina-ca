'use client';

type RedditPixelFunction = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    rdt?: RedditPixelFunction;
  }
}

const generateConversionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
};

export function trackRedditEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.rdt !== 'function') {
    return;
  }

  const enriched = payload ?? {};
  if (!('conversionId' in enriched)) {
    enriched.conversionId = generateConversionId();
  }

  window.rdt('track', name, enriched);
}
