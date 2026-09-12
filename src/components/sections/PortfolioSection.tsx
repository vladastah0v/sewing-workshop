/**
 * PortfolioSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: PortfolioSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { PortfolioSectionProps } from '@/types';

export function PortfolioSection(props: PortfolioSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="PortfolioSection">
      PortfolioSection
    </div>
  );
}
