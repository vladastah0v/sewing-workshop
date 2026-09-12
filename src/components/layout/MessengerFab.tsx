'use client';

import type { MessengerFabProps } from '@/types';
import { cn } from '@/lib/utils';
import { ANALYTICS_EVENTS } from '@/lib/constants';
import { track } from '@/lib/analytics';
import { Icon } from '@/components/ui/Icon';

const ICONS = {
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  viber: 'viber',
  vk: 'phone',
  max: 'phone',
} as const;

/**
 * Плавающие кнопки мессенджеров (ТЗ п.5.8).
 * На мобильных приподняты, чтобы не перекрывать StickyCta.
 */
export function MessengerFab({ contacts, position = 'right', className, id }: MessengerFabProps) {
  if (contacts.messengers.length === 0) return null;

  return (
    <div
      id={id}
      className={cn(
        'fixed z-[var(--z-sticky-cta)] flex flex-col gap-3',
        'bottom-24 lg:bottom-8',
        position === 'right' ? 'right-4' : 'left-4',
        className,
      )}
    >
      {contacts.messengers.map((messenger) => (
        <a
          key={messenger.kind}
          href={messenger.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Написать в ${messenger.label}`}
          onClick={() => track(ANALYTICS_EVENTS.messengerClick, { channel: messenger.kind })}
          className={cn(
            'grid size-13 place-items-center rounded-full bg-accent text-on-accent shadow-md',
            'transition-colors duration-[var(--duration-fast)] ease-standard hover:bg-accent-hover',
          )}
        >
          <Icon name={ICONS[messenger.kind]} size={26} />
        </a>
      ))}
    </div>
  );
}
