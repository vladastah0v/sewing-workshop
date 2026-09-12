/**
 * FaqSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: FaqSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { FaqSectionProps } from '@/types';

export function FaqSection(props: FaqSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="FaqSection">
      FaqSection
    </div>
  );
}
