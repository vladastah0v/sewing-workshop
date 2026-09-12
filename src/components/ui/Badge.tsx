import type { BadgeProps } from '@/types';
import { cn } from '@/lib/utils';

const TONES = {
  neutral: 'bg-bg-muted text-text-muted',
  accent: 'bg-accent-subtle text-brand-700',
  success: 'bg-success/12 text-success',
  warning: 'bg-warning/12 text-warning',
  error: 'bg-error/12 text-error',
} as const;

/** Статусный бейдж. Владелец: Агент 1. */
export function Badge({ tone = 'neutral', children, className, id }: BadgeProps) {
  return (
    <span
      id={id}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1',
        'text-sm font-medium whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
