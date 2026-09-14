'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { HeaderProps, NavLink } from '@/types';
import { cn } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { MessengerBadges } from '@/components/ui/MessengerBadges';

/** Шапка: логотип, меню с одним уровнем вложенности, телефон, CTA. */
export function Header({ nav, contacts, className, id }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Переход на другую страницу закрывает мобильное меню.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      id={id}
      className={cn(
        'sticky top-0 z-[var(--z-header)] border-b border-border',
        menuOpen ? 'bg-bg' : 'bg-bg/80 backdrop-blur',
        className,
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="font-script text-2xl leading-none whitespace-nowrap sm:text-3xl">
          {SITE_NAME}
        </Link>

        <nav aria-label="Основное меню" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <DesktopItem key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            {/* Номер намеренно не ссылка: решение заказчика от 14.09.2026. */}
            <span className="text-lg font-bold whitespace-nowrap select-all">
              {contacts.phoneDisplay}
            </span>
            <MessengerBadges messengers={contacts.messengers} size="sm" />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="grid size-11 place-items-center rounded-lg hover:bg-bg-muted lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-bg lg:hidden"
      >
        <Container as="nav" className="flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center rounded-lg px-3 text-lg font-medium hover:bg-bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <span className="text-2xl font-bold select-all">{contacts.phoneDisplay}</span>
            <MessengerBadges messengers={contacts.messengers} />
          </div>
        </Container>
      </div>
    </header>
  );
}

function DesktopItem({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  // Меню плоское: выпадающих панелей нет, поэтому нет и состояния.
  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex h-11 items-center rounded-lg px-3 font-medium',
          'hover:bg-bg-muted',
          active && 'text-accent',
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}
