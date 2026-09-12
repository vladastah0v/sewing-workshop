/**
 * Section — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: SectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { SectionProps } from '@/types';

export function Section(props: SectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Section">
      {props.children}
    </div>
  );
}
