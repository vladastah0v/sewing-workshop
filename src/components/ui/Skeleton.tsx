/**
 * Skeleton — ЗАГЛУШКА.
 * Владелец: Агент 1 — ядро.
 * Контракт пропсов: SkeletonProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { SkeletonProps } from '@/types';

export function Skeleton(props: SkeletonProps) {
  return (
    <div id={props.id} className={props.className} data-stub="Skeleton">
      Skeleton
    </div>
  );
}
