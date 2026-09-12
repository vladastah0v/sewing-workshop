import type { SectionProps } from '@/types';
import { cn } from '@/lib/utils';

const BACKGROUNDS = {
  default: 'bg-bg text-text',
  subtle: 'bg-bg-subtle text-text',
  muted: 'bg-bg-muted text-text',
  inverse: 'bg-bg-inverse text-text-inverse',
} as const;

// Вертикальный ритм: мобайл --section-py (48px), от lg --section-py-lg (96px).
const SPACING = {
  none: '',
  sm: 'py-8 lg:py-12',
  md: 'py-[var(--section-py)] lg:py-[var(--section-py-lg)]',
  lg: 'py-12 lg:py-32',
} as const;

/** Секция страницы: фон и вертикальный ритм. Владелец: Агент 1. */
export function Section({
  background = 'default',
  spacing = 'md',
  as: Tag = 'section',
  children,
  className,
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(BACKGROUNDS[background], SPACING[spacing], className)}>
      {children}
    </Tag>
  );
}
