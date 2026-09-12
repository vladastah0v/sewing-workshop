'use client';

/**
 * ReviewSlider — карусель отзывов (ТЗ п.5.1).
 * Владелец: Агент 3. Контракт пропсов: ReviewSliderProps в src/types/ui.ts.
 *
 * Прокрутка — нативный CSS scroll-snap: свайп на телефоне и колесо на десктопе
 * работают без JS, стрелки только вызывают scrollBy. Библиотека каруселей
 * ради этого в зависимости не добавляется (docs/CONTRACTS.md п.8.3).
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import type { ReviewSliderProps } from '@/types';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';
import { ReviewCard } from './ReviewCard';

const SLIDE_WIDTH = {
  1: 'basis-full',
  2: 'basis-full sm:basis-1/2',
  3: 'basis-full sm:basis-1/2 lg:basis-1/3',
} as const;

/** Пауза между автопрокрутками, мс. */
const AUTOPLAY_MS = 6000;

export function ReviewSlider({
  reviews,
  autoplay = false,
  slidesPerView = 3,
  className,
  id,
}: ReviewSliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild;
    const step = first instanceof HTMLElement ? first.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, []);

  // Состояние стрелок считаем из фактической прокрутки: ширина карточки меняется с брейкпоинтом.
  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(syncEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncEdges, reviews.length]);

  useEffect(() => {
    if (!autoplay || paused || reviews.length <= slidesPerView) return;
    // Уважаем системную настройку: при reduce motion автопрокрутки нет (ТЗ п.6.4).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByCards(1);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplay, paused, reviews.length, slidesPerView, scrollByCards]);

  if (reviews.length === 0) {
    return (
      <EmptyState
        id={id}
        className={className}
        iconName="quote"
        title="Отзывов пока нет"
        description="Станьте первым — расскажите, как прошёл заказ."
        action={{ label: 'Оставить отзыв', href: '/reviews#review-form' }}
      />
    );
  }

  return (
    <div
      id={id}
      className={cn('flex flex-col gap-6', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        onScroll={syncEdges}
        aria-label="Отзывы клиентов"
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li
            key={review.id}
            className={cn('shrink-0 snap-start', SLIDE_WIDTH[slidesPerView])}
          >
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      {reviews.length > 1 && (
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Предыдущие отзывы"
            className="grid size-11 place-items-center rounded-full border border-border-strong bg-surface text-text transition-colors duration-[var(--duration-fast)] ease-standard hover:bg-bg-subtle disabled:opacity-40"
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Следующие отзывы"
            className="grid size-11 place-items-center rounded-full border border-border-strong bg-surface text-text transition-colors duration-[var(--duration-fast)] ease-standard hover:bg-bg-subtle disabled:opacity-40"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
