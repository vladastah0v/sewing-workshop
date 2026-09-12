import type { SkeletonProps } from '@/types';
import { cn } from '@/lib/utils';

const SHAPES = { text: 'rounded-sm h-4', rect: 'rounded-lg', circle: 'rounded-full' } as const;

/** Скелетон загрузки (ТЗ п.6.2). Уважает prefers-reduced-motion через globals.css. */
export function Skeleton({ variant = 'text', width, height, count = 1, className, id }: SkeletonProps) {
  return (
    <span id={id} aria-hidden className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          style={{ width, height }}
          className={cn('block animate-pulse bg-bg-muted', SHAPES[variant])}
        />
      ))}
    </span>
  );
}
