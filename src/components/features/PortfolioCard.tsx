'use client';

/**
 * PortfolioCard — карточка работы в галерее (ТЗ п.5.4).
 * Владелец: Агент 3. Контракт пропсов: PortfolioCardProps в src/types/ui.ts.
 *
 * Кликабельна вся карточка, но кнопка ровно одна: вложенные интерактивные элементы
 * ломают навигацию с клавиатуры. Показываем «после» — результат, ради которого пришли.
 */

import Image from 'next/image';

import type { PortfolioCardProps } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { SERVICE_LABELS } from '@/lib/constants';

export function PortfolioCard({ item, onOpen, className, id }: PortfolioCardProps) {
  const shots = 1 + (item.before ? 1 : 0) + (item.gallery?.length ?? 0);

  const media = (
    <>
      <Image
        src={item.after.src}
        alt={item.after.alt}
        width={item.after.width}
        height={item.after.height}
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
        className="aspect-[4/5] w-full object-cover transition-transform duration-[var(--duration-slow)] ease-standard group-hover:scale-[1.03]"
      />
      {item.before && (
        <span className="absolute top-3 left-3">
          <Badge tone="accent">До / после</Badge>
        </span>
      )}
      {shots > 1 && (
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-neutral-900/70 px-3 py-1 text-sm text-text-inverse">
          <Icon name="image" size={16} />
          {shots}
        </span>
      )}
    </>
  );

  const caption = (
    <div className="flex flex-col gap-2 p-5">
      <span className="text-sm text-text-muted">{SERVICE_LABELS[item.category]}</span>
      <h3 className="font-heading text-xl">{item.title}</h3>
      {item.completedAt && (
        <time dateTime={item.completedAt} className="text-sm text-text-subtle">
          {formatDate(item.completedAt)}
        </time>
      )}
    </div>
  );

  return (
    <Card
      as="li"
      id={id}
      padding="none"
      interactive
      className={cn('group overflow-hidden', className)}
    >
      {onOpen ? (
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="w-full text-left"
          aria-label={`Открыть работу «${item.title}»`}
        >
          <span className="relative block overflow-hidden">{media}</span>
          {caption}
        </button>
      ) : (
        <>
          <div className="relative overflow-hidden">{media}</div>
          {caption}
        </>
      )}
    </Card>
  );
}
