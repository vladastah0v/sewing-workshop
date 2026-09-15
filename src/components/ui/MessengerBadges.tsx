import Image from 'next/image';

import type { MessengerBadgesProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

/** Фирменные логотипы (решение заказчика от 15.09.2026) — 128×128 WebP с прозрачным фоном. */
const LOGOS = {
  whatsapp: '/images/ui/messengers/whatsapp.webp',
  telegram: '/images/ui/messengers/telegram.webp',
  max: '/images/ui/messengers/max.webp',
} as const;

/** Для мессенджеров без логотипа остаётся контурная иконка. */
const ICONS = {
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  viber: 'viber',
  max: 'max',
  vk: 'phone',
} as const;

const SIZES = {
  sm: { box: 'size-8', px: 32, glyph: 18 },
  md: { box: 'size-10', px: 40, glyph: 20 },
} as const;

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

  const { box, px, glyph } = SIZES[size];

  return (
    <ul id={id} className={cn('flex items-center gap-2', className)}>
      {messengers.map((messenger) => {
        const logo = messenger.kind in LOGOS ? LOGOS[messenger.kind as keyof typeof LOGOS] : null;
        const inLink = Boolean(messenger.href);

        // Логотип сам по себе цветной знак — рамка и фон ему не нужны.
        const shared = logo
          ? cn('grid place-items-center', box)
          : cn('grid place-items-center rounded-full border border-border bg-surface text-accent', box);

        // В ссылке название даёт aria-label, у картинки alt пустой — иначе прочтётся дважды.
        const glyphNode = logo ? (
          <Image
            src={logo}
            alt={inLink ? '' : messenger.label}
            width={px}
            height={px}
            className="size-full object-contain"
          />
        ) : (
          <Icon
            name={ICONS[messenger.kind]}
            size={glyph}
            label={inLink ? undefined : messenger.label}
          />
        );

        return (
          <li key={messenger.kind}>
            {messenger.href ? (
              <a
                href={messenger.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Написать в ${messenger.label}`}
                className={cn(
                  shared,
                  logo ? 'transition-transform hover:scale-105' : 'transition-colors hover:bg-accent-subtle',
                )}
              >
                {glyphNode}
              </a>
            ) : (
              <span className={shared} title={messenger.label}>
                {glyphNode}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
