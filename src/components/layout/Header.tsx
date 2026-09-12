'use client';

/**
 * Header — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: HeaderProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { HeaderProps } from '@/types';

export function Header(props: HeaderProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Header">
      Header
    </div>
  );
}
