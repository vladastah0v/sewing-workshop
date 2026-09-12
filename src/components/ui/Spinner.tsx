/**
 * Spinner — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: SpinnerProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { SpinnerProps } from '@/types';

export function Spinner(props: SpinnerProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Spinner">
      Spinner
    </div>
  );
}
