import { env } from '@/env';

export type RateLimiter = {
  consume: (key: string) => boolean;
  getRemaining: (key: string) => number;
};

type Bucket = {
  remaining: number;
  resetAt: number;
};

const defaultMax = env.RATE_LIMIT_MAX ?? 5;
const defaultWindowSeconds = env.RATE_LIMIT_WINDOW ?? 60;

export class InMemoryRateLimiter implements RateLimiter {
  private buckets = new Map<string, Bucket>();

  constructor(private readonly max = defaultMax, private readonly windowSeconds = defaultWindowSeconds) {}

  consume(key: string) {
    const now = Date.now();
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, {
        remaining: this.max - 1,
        resetAt: now + this.windowSeconds * 1000
      });
      return true;
    }

    if (bucket.remaining <= 0) {
      return false;
    }

    bucket.remaining -= 1;
    this.buckets.set(key, bucket);
    return true;
  }

  getRemaining(key: string) {
    return this.buckets.get(key)?.remaining ?? this.max;
  }
}

export const rateLimiter = new InMemoryRateLimiter();
