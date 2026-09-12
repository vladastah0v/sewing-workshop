'use client';

/**
 * Button — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: ButtonProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ButtonProps } from '@/types';

export function Button(props: ButtonProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Button">
      {props.children}
    </div>
  );
}
