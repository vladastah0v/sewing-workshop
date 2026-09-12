'use client';

/**
 * Accordion — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: AccordionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { AccordionProps } from '@/types';

export function Accordion(props: AccordionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Accordion">
      Accordion
    </div>
  );
}
