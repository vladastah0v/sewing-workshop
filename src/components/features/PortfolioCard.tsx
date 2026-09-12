/**
 * PortfolioCard — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: PortfolioCardProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { PortfolioCardProps } from '@/types';

export function PortfolioCard(props: PortfolioCardProps) {
  return (
    <div id={props.id} className={props.className} data-stub="PortfolioCard">
      PortfolioCard
    </div>
  );
}
