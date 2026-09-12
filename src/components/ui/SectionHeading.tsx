import Link from 'next/link';

import type { SectionHeadingProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

const LEVELS = {
  1: 'text-4xl lg:text-5xl',
  2: 'text-3xl lg:text-4xl',
  3: 'text-2xl lg:text-3xl',
} as const;

/** Заголовок секции. Уровень задаётся явно: h1 на странице ровно один. */
export function SectionHeading({
  level = 2,
  title,
  subtitle,
  eyebrow,
  align = 'left',
  action,
  className,
  id,
}: SectionHeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';

  return (
    <div
      id={id}
      className={cn(
        'mb-8 flex flex-col gap-4 lg:mb-12',
        action && 'lg:flex-row lg:items-end lg:justify-between',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center')}>
        {eyebrow && (
          <span className="text-sm font-semibold tracking-[var(--tracking-wide)] text-accent uppercase">
            {eyebrow}
          </span>
        )}
        <Tag className={cn('font-heading', LEVELS[level])}>{title}</Tag>
        {subtitle && <p className="max-w-[60ch] text-lg text-text-muted">{subtitle}</p>}
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-2 font-semibold text-text-link hover:text-accent-active"
        >
          {action.label}
          <Icon name="arrow-right" size={20} />
        </Link>
      )}
    </div>
  );
}
