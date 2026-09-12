'use client';

/**
 * ServiceFilter — фильтр по категориям услуг и работ (ТЗ п.5.2).
 * Владелец: Агент 3. Контракт пропсов: ServiceFilterProps в src/types/ui.ts.
 *
 * Разметка — группа радиокнопок, а не набор button: выбор одного значения из списка,
 * стрелки клавиатуры должны переключать фильтр. Роль radiogroup даёт это без JS-хаков.
 */

import type { ServiceFilterProps, ServiceSlug } from '@/types';
import { cn } from '@/lib/utils';

export function ServiceFilter({ categories, value, onChange, className, id }: ServiceFilterProps) {
  const total = categories.reduce((sum, category) => sum + category.count, 0);
  const options: { value: ServiceSlug | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'Все', count: total },
    ...categories,
  ];

  const currentIndex = options.findIndex((option) => option.value === value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = options[(currentIndex + step + options.length) % options.length];
    if (next) onChange(next.value);
  };

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Фильтр по категориям"
      onKeyDown={onKeyDown}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            // Только выбранная кнопка в таб-последовательности: внутри группы
            // переключаемся стрелками, Tab уводит за её пределы.
            tabIndex={selected ? 0 : -1}
            disabled={option.count === 0 && option.value !== 'all'}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex h-11 items-center gap-2 rounded-full border px-5',
              'font-medium transition-colors duration-[var(--duration-fast)] ease-standard',
              'disabled:pointer-events-none disabled:opacity-50',
              selected
                ? 'border-accent bg-accent text-on-accent'
                : 'border-border bg-surface text-text hover:bg-bg-subtle',
            )}
          >
            {option.label}
            <span className={cn('text-sm', selected ? 'text-on-accent/80' : 'text-text-subtle')}>
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
