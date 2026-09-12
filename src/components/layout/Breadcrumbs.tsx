/**
 * Breadcrumbs — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: BreadcrumbsProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { BreadcrumbsProps } from '@/types';

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Breadcrumbs">
      Breadcrumbs
    </div>
  );
}
