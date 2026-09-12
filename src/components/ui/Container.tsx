import type { ContainerProps } from '@/types';
import { cn } from '@/lib/utils';

const WIDTHS = {
  default: 'max-w-[var(--container-max)]',
  narrow: 'max-w-[var(--container-narrow)]',
  full: '',
} as const;

/**
 * Container — единственное место, где задаются боковые поля.
 * Владелец: Агент 1. Гарантирует минимум 16px по краям на любой ширине (ТЗ п.6.3).
 */
export function Container({ width = 'default', as: Tag = 'div', children, className, id }: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn('mx-auto w-full px-[var(--container-gutter)]', WIDTHS[width], className)}
    >
      {children}
    </Tag>
  );
}
