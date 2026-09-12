/**
 * Обёртка над Яндекс.Метрикой / GA (ТЗ п.7.6).
 * Компоненты вызывают track(), не зная, какой счётчик стоит.
 * Владелец файла: Агент 4.
 */

import { ANALYTICS_EVENTS } from './constants';

type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

declare global {
  interface Window {
    ym?: (id: number, action: string, target: string, params?: unknown) => void;
    gtag?: (command: string, target: string, params?: unknown) => void;
  }
}

export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  const counterId = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (counterId && window.ym) {
    window.ym(counterId, 'reachGoal', event, params);
  }
  if (window.gtag) {
    window.gtag('event', event, params);
  }
}
