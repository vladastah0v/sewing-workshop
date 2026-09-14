'use client';

/**
 * WorksCarousel — лента фотографий работ (главная и /portfolio).
 * Владелец: Агент 3. Контракт пропсов: WorksCarouselProps в src/types/ui.ts.
 *
 * Прокрутка нативная, со scroll-snap: на телефоне листается свайпом, с клавиатуры —
 * стрелками, когда лента в фокусе. Кнопки сдвигают ровно на одно фото.
 * Подписей у фото нет намеренно — решение заказчика.
 */

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { WorksCarouselProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

const ARROW =
  'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border ' +
  'bg-surface/90 text-text shadow-md transition-opacity disabled:pointer-events-none disabled:opacity-0';

export function WorksCarousel({ images, className, id }: WorksCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateEdges]);

  const scrollByItem = (direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | null;
    if (!track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * (item.offsetWidth + gap),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  if (images.length === 0) return null;

  return (
    <div
      id={id}
      role="region"
      aria-roledescription="карусель"
      aria-label="Фотографии работ"
      className={cn('relative', className)}
    >
      <ul
        ref={trackRef}
        onScroll={updateEdges}
        tabIndex={0}
        className={cn(
          'flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl sm:gap-6',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        )}
      >
        {images.map((image, index) => (
          <li
            key={image.src}
            aria-label={`${index + 1} из ${images.length}`}
            className="w-[80%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 400px, (min-width: 480px) 50vw, 80vw"
              className="aspect-[3/4] w-full rounded-xl border border-border object-cover"
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollByItem(-1)}
        disabled={!canPrev}
        aria-label="Предыдущее фото"
        className={cn(ARROW, 'left-3')}
      >
        <Icon name="chevron-left" size={22} />
      </button>
      <button
        type="button"
        onClick={() => scrollByItem(1)}
        disabled={!canNext}
        aria-label="Следующее фото"
        className={cn(ARROW, 'right-3')}
      >
        <Icon name="chevron-right" size={22} />
      </button>
    </div>
  );
}
