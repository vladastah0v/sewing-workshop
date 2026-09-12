'use client';

import { useId } from 'react';

import type { RatingProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

const SIZES = { sm: 16, md: 20, lg: 24 } as const;
const STARS = [1, 2, 3, 4, 5] as const;

/** Звёзды. Без onChange — только вывод, с onChange — интерактивный выбор. */
export function Rating({
  value,
  onChange,
  size = 'md',
  showValue,
  label,
  required,
  error,
  className,
  id,
}: RatingProps) {
  const px = SIZES[size];
  const rounded = Math.round(value);
  const groupId = `${useId()}-rating`;

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
    <div id={id} className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span id={`${groupId}-label`} className="text-sm font-medium text-text">
          {label}
          {required && (
            <>
              <span aria-hidden className="ml-1 text-error">
                *
              </span>
              <span className="visually-hidden">, обязательное поле</span>
            </>
          )}
        </span>
      )}

      <div
        role="radiogroup"
        aria-label={label ? undefined : 'Оценка'}
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className="inline-flex gap-1"
      >
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

      {error && (
        <p id={`${groupId}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
