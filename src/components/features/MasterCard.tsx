/**
 * MasterCard — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: MasterCardProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { MasterCardProps } from '@/types';

export function MasterCard(props: MasterCardProps) {
  return (
    <div id={props.id} className={props.className} data-stub="MasterCard">
      MasterCard
    </div>
  );
}
