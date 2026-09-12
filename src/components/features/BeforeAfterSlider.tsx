'use client';

/**
 * BeforeAfterSlider — сравнение «до/после» (ТЗ п.5.4).
 * Владелец: Агент 3. Контракт пропсов: BeforeAfterSliderProps в src/types/ui.ts.
 *
 * Без библиотек: pointer events + clip-path. Ручка — настоящий input[type=range],
 * поэтому клавиатура, скринридер и тач работают без отдельного кода,
 * а «перетаскивание» — это те же нативные события ползунка.
 */

import Image from 'next/image';
import { useId, useState } from 'react';

import type { BeforeAfterSliderProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function BeforeAfterSlider({
  before,
  after,
  initialPosition = 50,
  labels = { before: 'До', after: 'После' },
  className,
  id,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const inputId = `${useId()}-range`;

  return (
    <div id={id} className={cn('flex flex-col gap-3', className)}>
      <div className="relative isolate overflow-hidden rounded-xl border border-border select-none">
        {/* Нижний слой — «после»: именно он остаётся при полном сдвиге вправо. */}
        <Image
          src={after.src}
          alt={after.alt}
          width={800}
          height={1000}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="aspect-[4/5] w-full object-cover"
        />

        {/* Верхний слой — «до», обрезается по позиции ползунка. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden
        >
          <Image
            src={before.src}
            alt=""
            width={800}
            height={1000}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <span
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-neutral-0/90"
          style={{ left: `${position}%` }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-neutral-0 text-text shadow-md"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <Icon name="chevron-left" size={14} />
          <Icon name="chevron-right" size={14} className="-mt-3.5 ml-3.5" />
        </span>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-neutral-900/70 px-3 py-1 text-sm text-text-inverse">
          {labels.before}
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-neutral-900/70 px-3 py-1 text-sm text-text-inverse">
          {labels.after}
        </span>

        {/* Прозрачный нативный range поверх картинки: мышь, тач и стрелки клавиатуры. */}
        <label className="visually-hidden" htmlFor={inputId}>
          Сдвиньте, чтобы сравнить: {labels.before} и {labels.after}
        </label>
        <input
          id={inputId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${position}% снимка «${labels.before}»`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent
            [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:opacity-0
            [&::-moz-range-thumb]:h-11 [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:opacity-0"
        />
      </div>

      <p className="text-sm text-text-muted">
        {labels.before} — слева, {labels.after} — справа. Двигайте ползунок мышью, пальцем
        или стрелками клавиатуры.
      </p>
    </div>
  );
}
