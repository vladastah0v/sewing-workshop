import type { MessengerBadgesProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

const ICONS = {
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  viber: 'viber',
  max: 'max',
  vk: 'phone',
} as const;

const SIZES = { sm: { box: 'size-8', glyph: 18 }, md: { box: 'size-10', glyph: 20 } } as const;

/**
 * MessengerBadges — значки мессенджеров рядом с телефоном.
 * Владелец: Агент 1.
 *
 * Пока у мастерской нет аккаунтов, значки декоративные: у MessengerLink нет
 * href, и элемент рендерится как span. Мёртвых ссылок на сайте быть не должно —
 * клик в никуда стоит дороже, чем отсутствие кнопки. Появится реальный адрес —
 * достаточно добавить href в src/content/contacts.ts, разметка станет ссылкой.
 */
export function MessengerBadges({ messengers, size = 'md', className, id }: MessengerBadgesProps) {
  if (messengers.length === 0) return null;

  const { box, glyph } = SIZES[size];
  const shared = cn(
    'grid place-items-center rounded-full border border-border bg-surface text-accent',
    box,
  );

  return (
    <ul id={id} className={cn('flex items-center gap-2', className)}>
      {messengers.map((messenger) => (
        <li key={messenger.kind}>
          {messenger.href ? (
            <a
              href={messenger.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Написать в ${messenger.label}`}
              className={cn(shared, 'transition-colors hover:bg-accent-subtle')}
            >
              <Icon name={ICONS[messenger.kind]} size={glyph} />
            </a>
          ) : (
            <span className={shared} title={messenger.label}>
              <Icon name={ICONS[messenger.kind]} size={glyph} label={messenger.label} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
