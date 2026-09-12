'use client';

/**
 * Select — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: SelectProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { SelectProps } from '@/types';

export function Select(props: SelectProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Select">
      Select
    </div>
  );
}
