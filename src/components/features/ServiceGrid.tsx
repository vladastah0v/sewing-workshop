/**
 * ServiceGrid — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: ServiceGridProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ServiceGridProps } from '@/types';

export function ServiceGrid(props: ServiceGridProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ServiceGrid">
      ServiceGrid
    </div>
  );
}
