/**
 * PriceTeaserSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: PriceTeaserSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { PriceTeaserSectionProps } from '@/types';

export function PriceTeaserSection(props: PriceTeaserSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="PriceTeaserSection">
      PriceTeaserSection
    </div>
  );
}
