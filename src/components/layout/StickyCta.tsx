'use client';

/**
 * StickyCta — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: StickyCtaProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { StickyCtaProps } from '@/types';

export function StickyCta(props: StickyCtaProps) {
  return (
    <div id={props.id} className={props.className} data-stub="StickyCta">
      StickyCta
    </div>
  );
}
