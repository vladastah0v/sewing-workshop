import type { CardProps } from '@/types';
import { cn } from '@/lib/utils';

const PADDING = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' } as const;

/** Контейнер-карточка. Владелец: Агент 1. */
export function Card({ as: Tag = 'div', padding = 'md', interactive, children, className, id }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'rounded-xl border border-border bg-surface',
        PADDING[padding],
        interactive &&
          'transition-shadow duration-[var(--duration-normal)] ease-standard hover:shadow-md focus-within:shadow-md',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
