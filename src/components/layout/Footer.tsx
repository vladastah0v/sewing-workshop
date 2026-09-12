/**
 * Footer — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: FooterProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { FooterProps } from '@/types';

export function Footer(props: FooterProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Footer">
      Footer
    </div>
  );
}
