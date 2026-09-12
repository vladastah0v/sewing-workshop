/**
 * Card — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: CardProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { CardProps } from '@/types';

export function Card(props: CardProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Card">
      {props.children}
    </div>
  );
}
