'use client';

/**
 * PriceTable — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: PriceTableProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { PriceTableProps } from '@/types';

export function PriceTable(props: PriceTableProps) {
  return (
    <div id={props.id} className={props.className} data-stub="PriceTable">
      PriceTable
    </div>
  );
}
