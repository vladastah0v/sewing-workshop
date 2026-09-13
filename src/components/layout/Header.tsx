'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { HeaderProps, NavLink } from '@/types';
import { cn } from '@/lib/utils';
import { ANALYTICS_EVENTS, SITE_NAME } from '@/lib/constants';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { MessengerBadges } from '@/components/ui/MessengerBadges';

/** Шапка: логотип, меню с одним уровнем вложенности, телефон, CTA. */
export function Header({ nav, contacts, transparent = false, className, id }: HeaderProps) {
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
        transparent && !menuOpen ? 'bg-bg/95 backdrop-blur' : 'bg-bg',
        className,
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="font-heading text-xl whitespace-nowrap">
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
            <a
              href={`tel:${contacts.phone}`}
              onClick={() => track(ANALYTICS_EVENTS.phoneClick, { place: 'header' })}
              className="text-lg font-bold whitespace-nowrap hover:text-accent"
            >
              {contacts.phoneDisplay}
            </a>
            <MessengerBadges messengers={contacts.messengers} size="sm" />
          </div>
          <Button
            href={`tel:${contacts.phone}`}
            size="sm"
            iconLeft="phone"
            className="hidden sm:inline-flex"
          >
            Позвонить
          </Button>
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
            <div key={item.href} className="flex flex-col">
              <Link
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-lg font-medium hover:bg-bg-muted"
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex min-h-11 items-center rounded-lg pr-3 pl-7 text-text-muted hover:bg-bg-muted"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`tel:${contacts.phone}`}
              onClick={() => track(ANALYTICS_EVENTS.phoneClick, { place: 'mobile-menu' })}
              className="text-2xl font-bold hover:text-accent"
            >
              {contacts.phoneDisplay}
            </a>
            <MessengerBadges messengers={contacts.messengers} />
            <Button href={`tel:${contacts.phone}`} iconLeft="phone" fullWidth>
              Позвонить
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

function DesktopItem({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <li className="group relative">
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex h-11 items-center gap-1 rounded-lg px-3 font-medium',
          'hover:bg-bg-muted',
          active && 'text-accent',
        )}
      >
        {item.label}
        {item.children && <Icon name="chevron-down" size={16} />}
      </Link>

      {item.children && (
        <ul
          className={cn(
            'invisible absolute top-full left-0 z-[var(--z-dropdown)] min-w-56 opacity-0',
            'rounded-xl border border-border bg-surface p-2 shadow-md',
            'transition-opacity duration-[var(--duration-fast)] ease-standard',
            'group-hover:visible group-hover:opacity-100',
            'group-focus-within:visible group-focus-within:opacity-100',
          )}
        >
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="flex min-h-11 items-center rounded-lg px-3 hover:bg-bg-muted"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
