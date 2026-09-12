'use client';

/**
 * WorkStatusBadge — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: WorkStatusBadgeProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { WorkStatusBadgeProps } from '@/types';

export function WorkStatusBadge(props: WorkStatusBadgeProps) {
  return (
    <div id={props.id} className={props.className} data-stub="WorkStatusBadge">
      WorkStatusBadge
    </div>
  );
}
