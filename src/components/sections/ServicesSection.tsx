/**
 * ServicesSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: ServicesSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ServicesSectionProps } from '@/types';

export function ServicesSection(props: ServicesSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ServicesSection">
      ServicesSection
    </div>
  );
}
