'use client';

/**
 * PortfolioGallery — ЗАГЛУШКА.
 * Владелец: Агент 3 — внутренние страницы и фичи.
 * Контракт пропсов: PortfolioGalleryProps в src/types/ui.ts — сигнатуру менять нельзя,
 * только через правку docs/CONTRACTS.md и согласование с другими агентами.
 */

import type { PortfolioGalleryProps } from '@/types';

export function PortfolioGallery(props: PortfolioGalleryProps) {
  return (
    <div id={props.id} className={props.className} data-stub="PortfolioGallery">
      PortfolioGallery
    </div>
  );
}
