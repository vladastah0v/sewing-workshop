/**
 * EmptyState — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: EmptyStateProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { EmptyStateProps } from '@/types';

export function EmptyState(props: EmptyStateProps) {
  return (
    <div id={props.id} className={props.className} data-stub="EmptyState">
      EmptyState
    </div>
  );
}
