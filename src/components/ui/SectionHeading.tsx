/**
 * SectionHeading — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: SectionHeadingProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { SectionHeadingProps } from '@/types';

export function SectionHeading(props: SectionHeadingProps) {
  return (
    <div id={props.id} className={props.className} data-stub="SectionHeading">
      SectionHeading
    </div>
  );
}
