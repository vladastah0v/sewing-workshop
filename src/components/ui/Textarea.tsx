'use client';

/**
 * Textarea — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: TextareaProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { TextareaProps } from '@/types';

export function Textarea(props: TextareaProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Textarea">
      Textarea
    </div>
  );
}
