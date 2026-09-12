/**
 * Icon — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: IconProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { IconProps } from '@/types';

export function Icon(props: IconProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Icon">
      Icon
    </div>
  );
}
