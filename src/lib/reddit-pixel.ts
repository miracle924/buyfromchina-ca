'use client';

type RedditPixelFunction = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    rdt?: RedditPixelFunction;
  }
}

export function trackRedditEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.rdt !== 'function') {
    return;
  }

  if (payload) {
    window.rdt('track', name, payload);
  } else {
    window.rdt('track', name);
  }
}
