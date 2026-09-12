import type { SpinnerProps } from '@/types';
import { cn } from '@/lib/utils';

const SIZES = { sm: 'size-4 border-2', md: 'size-5 border-2', lg: 'size-7 border-[3px]' } as const;

/** Индикатор загрузки (ТЗ п.6.2). Владелец: Агент 1. */
export function Spinner({ size = 'md', label = 'Загрузка', className, id }: SpinnerProps) {
  return (
    <span id={id} role="status" className={cn('inline-flex items-center', className)}>
      <span
        className={cn(
          'animate-spin rounded-full border-current border-r-transparent opacity-70',
          SIZES[size],
        )}
      />
      <span className="visually-hidden">{label}</span>
    </span>
  );
}
