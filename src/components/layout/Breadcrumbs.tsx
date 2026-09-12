import Link from 'next/link';

import type { BreadcrumbsProps } from '@/types';
import { cn } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';

/**
 * Хлебные крошки (ТЗ п.6.2) + микроразметка BreadcrumbList (ТЗ п.7.4).
 * Последний элемент — без href, это текущая страница.
 */
export function Breadcrumbs({ items, className, id }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav id={id} aria-label="Хлебные крошки" className={cn('py-4', className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <Icon name="chevron-right" size={16} className="text-text-subtle" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
