'use client';

/**
 * RequestForm — ЗАГЛУШКА.
 * Владелец: Агент 4 — формы и API.
 * Контракт пропсов: RequestFormProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { RequestFormProps } from '@/types';

export function RequestForm(props: RequestFormProps) {
  return (
    <div id={props.id} className={props.className} data-stub="RequestForm">
      RequestForm
    </div>
  );
}
