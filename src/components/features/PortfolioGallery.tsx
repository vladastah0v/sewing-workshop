'use client';

/**
 * PortfolioGallery — галерея работ с фильтром, догрузкой и просмотром (ТЗ п.5.4).
 * Владелец: Агент 3. Контракт пропсов: PortfolioGalleryProps в src/types/ui.ts.
 *
 * Просмотр разведён по типу работы: если есть снимок «до» — открываем сравнение
 * в Modal, иначе отдаём фото в Lightbox. Обе оболочки — готовые примитивы Агента 1.
 */

import { useMemo, useState } from 'react';

import type { PortfolioGalleryProps, PortfolioItem, ServiceSlug } from '@/types';
import { cn } from '@/lib/utils';
import { SERVICE_LABELS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Lightbox } from '@/components/ui/Lightbox';
import { Modal } from '@/components/ui/Modal';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { PortfolioCard } from './PortfolioCard';
import { ServiceFilter } from './ServiceFilter';

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

export function PortfolioGallery({
  items,
  showFilters = true,
  columns = 3,
  initialCount,
  className,
  id,
}: PortfolioGalleryProps) {
  const [category, setCategory] = useState<ServiceSlug | 'all'>('all');
  const [visible, setVisible] = useState(initialCount ?? items.length);
  const [opened, setOpened] = useState<PortfolioItem | null>(null);

  // Категории строим по фактическому набору работ: пустых кнопок в фильтре быть не должно.
  const categories = useMemo(() => {
    const counts = new Map<ServiceSlug, number>();
    for (const item of items) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    return [...counts.entries()].map(([value, count]) => ({
      value,
      label: SERVICE_LABELS[value],
      count,
    }));
  }, [items]);

  const filtered = useMemo(
    () => (category === 'all' ? items : items.filter((item) => item.category === category)),
    [items, category],
  );

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > shown.length;

  const onFilterChange = (value: ServiceSlug | 'all') => {
    setCategory(value);
    setVisible(initialCount ?? items.length);
  };

  // Для Lightbox: «после» первым, затем галерея. Снимок «до» сюда не идёт —
  // он показывается сравнением в Modal.
  const lightboxImages =
    opened && !opened.before
      ? [opened.after, ...(opened.gallery ?? [])].map((image) => ({
          src: image.src,
          alt: image.alt,
        }))
      : [];

  return (
    <div id={id} className={cn('flex flex-col gap-8', className)}>
      {showFilters && categories.length > 1 && (
        <ServiceFilter categories={categories} value={category} onChange={onFilterChange} />
      )}

      {shown.length === 0 ? (
        <EmptyState
          iconName="image"
          title="В этой категории пока нет работ"
          description="Мы добавляем новые фотографии каждую неделю. Посмотрите остальные работы или расскажите о своей задаче — подберём похожий пример."
          action={{ label: 'Показать все работы', onClick: () => onFilterChange('all') }}
        />
      ) : (
        <>
          {/* aria-live: после фильтрации и догрузки скринридер сообщает новое количество. */}
          <p aria-live="polite" className="visually-hidden">
            Показано работ: {shown.length} из {filtered.length}
          </p>

          <ul className={cn('grid grid-cols-1 gap-6', COLUMNS[columns])}>
            {shown.map((item) => (
              <PortfolioCard key={item.id} item={item} onOpen={setOpened} />
            ))}
          </ul>

          {hasMore && (
            <div className="flex justify-center">
              <Button
                variant="secondary"
                onClick={() => setVisible((current) => current + (initialCount ?? 6))}
              >
                Показать ещё
              </Button>
            </div>
          )}
        </>
      )}

      {/* Работы со снимком «до» — сравнение, остальные — обычный просмотр фото. */}
      <Modal
        open={Boolean(opened?.before)}
        onClose={() => setOpened(null)}
        title={opened?.title ?? ''}
        description={opened?.description}
        size="lg"
      >
        {opened?.before && (
          <BeforeAfterSlider before={opened.before} after={opened.after} />
        )}
      </Modal>

      <Lightbox
        open={Boolean(opened && !opened.before)}
        onClose={() => setOpened(null)}
        images={lightboxImages}
      />
    </div>
  );
}
