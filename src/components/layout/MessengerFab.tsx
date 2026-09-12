'use client';

/**
 * MessengerFab — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: MessengerFabProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { MessengerFabProps } from '@/types';

export function MessengerFab(props: MessengerFabProps) {
  return (
    <div id={props.id} className={props.className} data-stub="MessengerFab">
      MessengerFab
    </div>
  );
}
