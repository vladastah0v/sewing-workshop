/**
 * Container — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: ContainerProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ContainerProps } from '@/types';

export function Container(props: ContainerProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Container">
      {props.children}
    </div>
  );
}
