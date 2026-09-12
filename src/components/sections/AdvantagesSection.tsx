/**
 * AdvantagesSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: AdvantagesSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { AdvantagesSectionProps } from '@/types';

export function AdvantagesSection(props: AdvantagesSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="AdvantagesSection">
      AdvantagesSection
    </div>
  );
}
