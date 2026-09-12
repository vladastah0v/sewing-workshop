'use client';

/**
 * Modal — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: ModalProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ModalProps } from '@/types';

export function Modal(props: ModalProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Modal">
      {props.children}
    </div>
  );
}
