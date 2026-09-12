'use client';

/**
 * Lightbox — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: LightboxProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { LightboxProps } from '@/types';

export function Lightbox(props: LightboxProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Lightbox">
      Lightbox
    </div>
  );
}
