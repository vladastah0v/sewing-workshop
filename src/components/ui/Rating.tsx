'use client';

/**
 * Rating — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: RatingProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { RatingProps } from '@/types';

export function Rating(props: RatingProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Rating">
      Rating
    </div>
  );
}
