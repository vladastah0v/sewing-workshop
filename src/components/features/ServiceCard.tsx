/**
 * ServiceCard — карточка услуги (ТЗ п.5.2).
 * Владелец: Агент 3. Контракт пропсов: ServiceCardProps в src/types/ui.ts.
 *
 * Серверный компонент по умолчанию; 'use client' появляется только у потребителя,
 * который передаёт onOrderClick.
 */

import Link from 'next/link';

import type { ServiceCardProps } from '@/types';
import { cn, formatLeadTime, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function ServiceCard({
  service,
  layout = 'grid',
  showCta = true,
  onOrderClick,
  className,
  id,
}: ServiceCardProps) {
  const href = `/services/${service.slug}`;
  const priceLabel = service.priceFrom === null ? 'по замерам' : `от ${formatPrice(service.priceFrom)}`;

  const meta = (
    <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <div className="flex items-baseline gap-2">
        <dt className="text-sm text-text-muted">Цена</dt>
        <dd className="font-semibold whitespace-nowrap">{priceLabel}</dd>
      </div>
      <div className="flex items-baseline gap-2">
        <dt className="text-sm text-text-muted">Срок</dt>
        <dd className="font-semibold whitespace-nowrap">{formatLeadTime(service.leadTimeDays)}</dd>
      </div>
    </dl>
  );

  if (layout === 'compact') {
    return (
      <Card
        as="li"
        id={id}
        padding="sm"
        interactive
        className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6', className)}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-subtle text-brand-700">
          <Icon name={service.iconName ?? 'scissors'} size={22} />
        </span>

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-heading text-xl">
            <Link href={href} className="hover:text-accent">
              {service.title}
            </Link>
          </h3>
          <p className="text-sm text-text-muted">{service.shortDescription}</p>
        </div>

        <div className="sm:ml-auto sm:text-right">{meta}</div>
      </Card>
    );
  }

  return (
    <Card
      as="li"
      id={id}
      padding="none"
      interactive
      className={cn('flex flex-col overflow-hidden', className)}
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-subtle text-brand-700">
            <Icon name={service.iconName ?? 'scissors'} size={22} />
          </span>
          {service.popular && <Badge tone="accent">Чаще всего заказывают</Badge>}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl">
            <Link href={href} className="hover:text-accent">
              {service.title}
            </Link>
          </h3>
          <p className="text-text-muted">{service.shortDescription}</p>
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-2">
          {meta}
          {showCta && (
            <div className="flex flex-wrap gap-3">
              {onOrderClick ? (
                <Button size="sm" onClick={() => onOrderClick(service)}>
                  Заказать
                </Button>
              ) : (
                <Button size="sm" href={`${href}#contact`}>
                  Заказать
                </Button>
              )}
              <Button size="sm" variant="secondary" href={href} iconRight="arrow-right">
                Подробнее
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
