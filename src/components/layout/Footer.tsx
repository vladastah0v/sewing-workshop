import Link from 'next/link';

import type { FooterProps } from '@/types';
import { cn } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { MessengerBadges } from '@/components/ui/MessengerBadges';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

/** Подвал: навигация, контакты, режим работы, политика. */
export function Footer({ nav, contacts, className, id }: FooterProps) {
  return (
    <footer id={id} className={cn('mt-16 bg-bg-inverse bg-thread text-text-inverse', className)}>
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="flex flex-col gap-3">
          <p className="font-heading text-xl">{SITE_NAME}</p>
          <p className="text-neutral-300">
            Ремонт, подгонка и индивидуальный пошив одежды.
          </p>
        </div>

        <nav aria-label="Навигация в подвале" className="flex flex-col gap-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="min-h-8 text-neutral-200 hover:text-neutral-0">
              {item.label}
            </Link>
          ))}
        </nav>

        <address className="flex flex-col gap-3 not-italic">
          <a
            href={`tel:${contacts.phone}`}
            className="flex items-center gap-2 text-lg font-bold hover:text-brand-300"
          >
            <Icon name="phone" size={20} />
            {contacts.phoneDisplay}
          </a>
          <a href={`mailto:${contacts.email}`} className="flex items-center gap-2 text-neutral-200 hover:text-neutral-0">
            <Icon name="mail" size={20} />
            {contacts.email}
          </a>
          <p className="flex items-start gap-2 text-neutral-200">
            <Icon name="map-pin" size={20} className="shrink-0" />
            <span>
              {contacts.city}, {contacts.addressLine}
            </span>
          </p>
          <MessengerBadges messengers={contacts.messengers} className="mt-1" />
        </address>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Режим работы</p>
          <ul className="flex flex-col gap-1 text-neutral-300">
            {contacts.workingHours.map((day) => (
              <li key={day.day} className="flex justify-between gap-4">
                <span>{WEEKDAYS[day.day - 1]}</span>
                <span>{day.opensAt ? `${day.opensAt}\u2013${day.closesAt}` : 'выходной'}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-neutral-800">
        <Container className="flex flex-col gap-2 py-6 text-sm text-neutral-400 md:flex-row md:justify-between">
          <p>
            {new Date().getFullYear()} {SITE_NAME}
          </p>
          <Link href="/privacy" className="hover:text-neutral-0">
            Политика конфиденциальности
          </Link>
        </Container>
      </div>
    </footer>
  );
}
