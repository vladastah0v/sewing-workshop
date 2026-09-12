/**
 * CtaSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: CtaSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { CtaSectionProps } from '@/types';

export function CtaSection(props: CtaSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="CtaSection">
      CtaSection
    </div>
  );
}
