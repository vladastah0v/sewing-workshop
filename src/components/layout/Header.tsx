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
            <span className="text-2xl font-bold select-all">{contacts.phoneDisplay}</span>
            <MessengerBadges messengers={contacts.messengers} />
          </div>
        </Container>
      </div>
    </header>
  );
}

function DesktopItem({ item, pathname }: { item: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  // Закрываем подменю по Escape и при переходе на другую страницу.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const link = (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      aria-expanded={item.children ? open : undefined}
      aria-haspopup={item.children ? 'true' : undefined}
      className={cn(
        'flex h-11 items-center gap-1 rounded-lg px-3 font-medium',
        'hover:bg-bg-muted',
        active && 'text-accent',
      )}
    >
      {item.label}
      {item.children && <Icon name="chevron-down" size={16} />}
    </Link>
  );

  if (!item.children) {
    return <li className="relative">{link}</li>;
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Открытием управляет состояние, а не :hover и :focus-within.
      // На CSS-варианте подменю залипало: клик оставлял фокус на ссылке,
      // и focus-within держал панель открытой после ухода курсора.
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      {link}

      <ul
        className={cn(
          'absolute top-full left-0 z-[var(--z-dropdown)] min-w-56',
          'rounded-xl border border-border bg-surface p-2 shadow-md',
          'transition-opacity duration-[var(--duration-fast)] ease-standard',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        {item.children.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              tabIndex={open ? undefined : -1}
              className="flex min-h-11 items-center rounded-lg px-3 hover:bg-bg-muted"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
