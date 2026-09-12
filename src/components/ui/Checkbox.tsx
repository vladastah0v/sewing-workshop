'use client';

/**
 * Checkbox — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: CheckboxProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { CheckboxProps } from '@/types';

export function Checkbox(props: CheckboxProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Checkbox">
      Checkbox
    </div>
  );
}
