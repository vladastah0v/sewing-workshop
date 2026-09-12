/**
 * ReviewCard — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: ReviewCardProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ReviewCardProps } from '@/types';

export function ReviewCard(props: ReviewCardProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ReviewCard">
      ReviewCard
    </div>
  );
}
