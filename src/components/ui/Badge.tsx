/**
 * Badge — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: BadgeProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { BadgeProps } from '@/types';

export function Badge(props: BadgeProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Badge">
      {props.children}
    </div>
  );
}
