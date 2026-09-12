/**
 * ServiceGrid — сетка карточек услуг (ТЗ п.5.2).
 * Владелец: Агент 3. Контракт пропсов: ServiceGridProps в src/types/ui.ts.
 *
 * Сетка на ul/li: список услуг — это список, скринридер должен объявить его длину.
 */

import type { ServiceGridProps } from '@/types';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { ServiceCard } from './ServiceCard';

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

export function ServiceGrid({
  services,
  columns = 3,
  emptyMessage,
  className,
  id,
}: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <EmptyState
        id={id}
        className={className}
        iconName="scissors"
        title="Услуги не найдены"
        description={emptyMessage ?? 'Попробуйте выбрать другую категорию или посмотрите весь список.'}
        action={{ label: 'Показать все услуги', href: '/services' }}
      />
    );
  }

  return (
    <ul id={id} className={cn('grid grid-cols-1 gap-6', COLUMNS[columns], className)}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </ul>
  );
}
