'use client';

import type { RatingProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

const SIZES = { sm: 16, md: 20, lg: 24 } as const;
const STARS = [1, 2, 3, 4, 5] as const;

/** Звёзды. Без onChange — только вывод, с onChange — интерактивный выбор. */
export function Rating({ value, onChange, size = 'md', showValue, className, id }: RatingProps) {
  const px = SIZES[size];
  const rounded = Math.round(value);

  if (!onChange) {
    return (
      <span id={id} className={cn('inline-flex items-center gap-1', className)}>
        <span className="flex" aria-hidden>
          {STARS.map((star) => (
            <Icon
              key={star}
              name="star"
              size={px}
              className={star <= rounded ? 'text-accent' : 'text-neutral-300'}
            />
          ))}
        </span>
        <span className="visually-hidden">Оценка {value} из 5</span>
        {showValue && <span className="text-sm font-medium text-text-muted">{value.toFixed(1)}</span>}
      </span>
    );
  }

  return (
    <div id={id} role="radiogroup" aria-label="Оценка" className={cn('inline-flex gap-1', className)}>
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === rounded}
          aria-label={`${star} из 5`}
          onClick={() => onChange(star)}
          className={cn(
            'grid size-11 place-items-center rounded-md',
            'transition-colors duration-[var(--duration-fast)] ease-standard hover:bg-bg-muted',
            star <= rounded ? 'text-accent' : 'text-neutral-300',
          )}
        >
          <Icon name="star" size={px} />
        </button>
      ))}
    </div>
  );
}
