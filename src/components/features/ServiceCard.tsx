/**
 * ServiceCard — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: ServiceCardProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ServiceCardProps } from '@/types';

export function ServiceCard(props: ServiceCardProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ServiceCard">
      ServiceCard
    </div>
  );
}
