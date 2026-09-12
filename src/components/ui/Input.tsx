'use client';

/**
 * Input — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: InputProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { InputProps } from '@/types';

export function Input(props: InputProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Input">
      Input
    </div>
  );
}
