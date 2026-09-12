'use client';

/**
 * ServiceFilter — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: ServiceFilterProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ServiceFilterProps } from '@/types';

export function ServiceFilter(props: ServiceFilterProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ServiceFilter">
      ServiceFilter
    </div>
  );
}
