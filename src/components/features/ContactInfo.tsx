/**
 * ContactInfo — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: ContactInfoProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { ContactInfoProps } from '@/types';

export function ContactInfo(props: ContactInfoProps) {
  return (
    <div id={props.id} className={props.className} data-stub="ContactInfo">
      ContactInfo
    </div>
  );
}
