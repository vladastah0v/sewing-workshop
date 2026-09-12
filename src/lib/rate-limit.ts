/**
 * Ограничение частоты отправок по IP — третий уровень антиспама (контракт п.6.4).
 * Владелец файла: Агент 4.
 *
 * Счётчик в памяти процесса: для одного инстанса Node этого достаточно.
 * При горизонтальном масштабировании заменяется на Redis — интерфейс тот же.
 */

import { FORM_LIMITS } from './constants';

export interface RateLimitResult {
  allowed: boolean;
  /** Сколько секунд ждать до следующей попытки. */
  retryAfterSec: number;
}

const buckets = new Map<string, number[]>();

/** Чистим протухшие ключи, чтобы карта не росла бесконечно. */
function sweep(now: number, windowMs: number): void {
  for (const [key, hits] of buckets) {
    const fresh = hits.filter((time) => now - time < windowMs);
    if (fresh.length === 0) buckets.delete(key);
    else buckets.set(key, fresh);
  }
}

export function checkRateLimit(
  key: string,
  limit: number = FORM_LIMITS.rateLimitCount,
  windowMs: number = FORM_LIMITS.rateLimitWindowMs,
): RateLimitResult {
  const now = Date.now();
  sweep(now, windowMs);

  const hits = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);

  if (hits.length >= limit) {
    const oldest = hits[0] ?? now;
    return { allowed: false, retryAfterSec: Math.ceil((windowMs - (now - oldest)) / 1000) };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { allowed: true, retryAfterSec: 0 };
}

/**
 * IP клиента. За обратным прокси (Vercel, nginx) реальный адрес приходит
 * в заголовках; без них лимит вырождается в общий счётчик — это осознанно,
 * лучше грубое ограничение, чем никакого.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
