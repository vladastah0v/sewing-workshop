import type { IconName } from '@/types';
import type { IconProps } from '@/types';

/**
 * Icon — единственный источник иконок в проекте.
 * Владелец: Агент 1. Новое имя добавляется сначала в IconName (src/types/content.ts),
 * потом сюда — иначе набор разъедется между агентами.
 *
 * Все глифы: сетка 24, обводка currentColor, без заливки.
 */
const PATHS: Record<IconName, string> = {
  scissors:
    'M6 5l12 12M18 5L9.5 13.5M8 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM8 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  needle: 'M20 4L8.5 15.5M6 18l2.5-2.5M4.5 19.5l1-1M20 4l-1.5 3.5L15 9',
  ruler: 'M3 9h18v6H3zM7 9v3M11 9v3M15 9v3M19 9v3',
  hanger: 'M12 7a2 2 0 1 1 2-2M12 7v3M3.5 17.5L12 10l8.5 7.5a1 1 0 0 1-.7 1.5H4.2a1 1 0 0 1-.7-1.5z',
  zipper: 'M9 3v11M15 3v11M9 6h-2M9 10h-2M15 6h2M15 10h2M12 14v4M10.5 18h3v3h-3z',
  shirt: 'M8 3l4 2 4-2 4 3-2 3-1-1v11H7V8L6 9 4 6z',
  dress: 'M9 3h6l-1 5 3 13H7l3-13z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  shield: 'M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6zM9 12l2 2 4-4',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z',
  quote: 'M9 6c-3 1.5-4.5 4-4.5 7.5V18h6v-6H7c0-2 .7-3.4 2-4.2zM20 6c-3 1.5-4.5 4-4.5 7.5V18h6v-6H18c0-2 .7-3.4 2-4.2z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
  phone:
    'M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  'map-pin': 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  whatsapp:
    'M3.5 20.5l1.4-4.4A8.2 8.2 0 1 1 8 19.2zM9 8.5c-.6.6-.6 1.8 0 2.9a8 8 0 0 0 3.6 3.6c1.1.6 2.3.6 2.9 0l-1.4-1.7-1.4.6-2-2 .6-1.4z',
  telegram: 'M21 4L3 11l5 2 2 6 3-3.5 4 3z M8 13l9-6-6 8',
  viber:
    'M12 3c4.5 0 7.5 2.8 7.5 7 0 4.2-3 7-7.5 7-.7 0-1.4-.1-2-.2L6 20v-3.4C4.4 15.3 3.5 13.4 3.5 10c0-4.2 4-7 8.5-7zM9.5 8c-.5.4-.6 1.3 0 2.2a6 6 0 0 0 2.6 2.6c.9.6 1.8.5 2.2 0',
  'chevron-left': 'M15 5l-7 7 7 7',
  'chevron-right': 'M9 5l7 7-7 7',
  'chevron-down': 'M5 9l7 7 7-7',
  'arrow-right': 'M4 12h15M13 6l6 6-6 6',
  close: 'M5 5l14 14M19 5L5 19',
  menu: 'M4 7h16M4 12h16M4 17h16',
  check: 'M5 12.5l4.5 4.5L19 7',
  alert: 'M12 3.5L22 20H2zM12 10v4M12 17h.01',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
  upload: 'M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
  image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6',
};

export function Icon({ name, size = 24, label, className, id }: IconProps) {
  const d = PATHS[name];

  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
