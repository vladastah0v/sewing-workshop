/**
 * HeroSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: HeroSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { HeroSectionProps } from '@/types';

export function HeroSection(props: HeroSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="HeroSection">
      HeroSection
    </div>
  );
}
