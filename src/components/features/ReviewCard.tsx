'use client';

/**
 * ReviewCard — карточка отзыва (ТЗ п.5.7).
 * Владелец: Агент 3. Контракт пропсов: ReviewCardProps в src/types/ui.ts.
 *
 * Микроразметку Review здесь не пишем: на странице отзывов она собирается одним
 * JSON-LD с AggregateRating (src/lib/seo.ts). Дублировать её в разметке —
 * значит удвоить отзывы в глазах поисковика.
 */

import Image from 'next/image';
import { useState } from 'react';

import type { ReviewCardProps } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { SERVICE_LABELS } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Rating } from '@/components/ui/Rating';

/** Длина, после которой текст сворачивается. Короткие отзывы кнопку не получают. */
const TRUNCATE_AT = 220;

const SOURCE_LABELS = {
  site: 'Сайт',
  yandex: 'Яндекс.Карты',
  google: 'Google',
  '2gis': '2ГИС',
  avito: 'Авито',
} as const;

export function ReviewCard({ review, truncate = true, className, id }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  const isLong = review.text.length > TRUNCATE_AT;
  const collapsed = truncate && isLong && !expanded;
  const text = collapsed ? `${review.text.slice(0, TRUNCATE_AT).trimEnd()}…` : review.text;

  return (
    <Card as="article" id={id} className={cn('flex h-full flex-col gap-4', className)}>
      <div className="flex items-start gap-4">
        {review.authorPhoto ? (
          <Image
            src={review.authorPhoto.src}
            alt={review.authorPhoto.alt}
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-subtle font-heading text-xl text-brand-700"
          >
            {review.authorName.slice(0, 1)}
          </span>
        )}

        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-semibold">{review.authorName}</p>
          <Rating value={review.rating} size="sm" />
        </div>

        <Icon name="quote" size={28} className="ml-auto shrink-0 text-accent-subtle" aria-hidden />
      </div>

      <blockquote className="flex-1 text-text-muted">{text}</blockquote>

      {collapsed && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="self-start font-semibold text-text-link hover:text-accent-active"
        >
          Читать полностью
        </button>
      )}

      <footer className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-sm text-text-subtle">
        <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
        {review.serviceCategory && <Badge>{SERVICE_LABELS[review.serviceCategory]}</Badge>}
        {review.source && review.source !== 'site' && (
          <span className="ml-auto">{SOURCE_LABELS[review.source]}</span>
        )}
      </footer>
    </Card>
  );
}
