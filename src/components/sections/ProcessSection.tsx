/**
 * ProcessSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: ProcessSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ProcessSectionProps } from '@/types';

export function ProcessSection(props: ProcessSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ProcessSection">
      ProcessSection
    </div>
  );
}
