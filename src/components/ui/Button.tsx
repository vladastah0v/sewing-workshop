'use client';

import Link from 'next/link';

import type { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { Spinner } from './Spinner';

const VARIANTS = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active',
  secondary: 'border border-border-strong bg-surface text-text hover:bg-bg-subtle',
  ghost: 'text-text hover:bg-bg-muted',
  link: 'text-text-link underline underline-offset-4 hover:text-accent-active',
} as const;

// Высоты — из токенов: 36 / 44 / 52. Тач-минимум 44px соблюдён у md и lg.
const SIZES = {
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-11 px-5 text-base gap-2',
  lg: 'h-13 px-6 text-lg gap-3',
} as const;

/**
 * Button — основная кнопка проекта. Владелец: Агент 1.
 * С href рендерится ссылкой (next/link), без него — button.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled,
  loading,
  fullWidth,
  iconLeft,
  iconRight,
  onClick,
  children,
  className,
  id,
}: ButtonProps) {
  const iconSize = size === 'lg' ? 22 : 20;

  const classes = cn(
    'inline-flex items-center justify-center rounded-lg font-semibold',
    'transition-colors duration-[var(--duration-fast)] ease-standard',
    'disabled:pointer-events-none disabled:opacity-50',
    variant !== 'link' && SIZES[size],
    VARIANTS[variant],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {loading ? <Spinner size="sm" /> : iconLeft ? <Icon name={iconLeft} size={iconSize} /> : null}
      <span>{children}</span>
      {iconRight && !loading ? <Icon name={iconRight} size={iconSize} /> : null}
    </>
  );

  // Ссылку нельзя «заблокировать» — в этих состояниях отдаём button.
  if (href && !disabled && !loading) {
    return (
      <Link id={id} href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
