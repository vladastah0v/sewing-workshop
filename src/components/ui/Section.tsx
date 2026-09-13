import type { SectionProps } from '@/types';
import { cn } from '@/lib/utils';

// Фоны полупрозрачны: сквозь них просвечивает полотно PageBackground.
// Плотности подобраны так, чтобы контраст текста остался в пределах AA —
// проверено расчётом композита «вуаль поверх фотографии».
const BACKGROUNDS = {
  default: 'text-text',
  subtle: 'bg-bg-subtle/80 text-text',
  muted: 'bg-bg-muted/90 text-text',
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
