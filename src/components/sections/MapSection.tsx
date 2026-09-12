/**
 * MapSection — ЗАГЛУШКА.
 * Владелец: Агент 2 — секции главной.
 * Контракт пропсов: MapSectionProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { MapSectionProps } from '@/types';

export function MapSection(props: MapSectionProps) {
  return (
    <div id={props.id} className={props.className} data-stub="MapSection">
      MapSection
    </div>
  );
}
