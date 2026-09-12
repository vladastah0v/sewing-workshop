/**
 * BlogCard — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: BlogCardProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { BlogCardProps } from '@/types';

export function BlogCard(props: BlogCardProps) {
  return (
    <div id={props.id} className={props.className} data-stub="BlogCard">
      BlogCard
    </div>
  );
}
