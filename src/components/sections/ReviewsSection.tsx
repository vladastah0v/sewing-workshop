/**
 * ReviewsSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: ReviewsSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ReviewsSectionProps } from '@/types';

export function ReviewsSection(props: ReviewsSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ReviewsSection">
      ReviewsSection
    </div>
  );
}
