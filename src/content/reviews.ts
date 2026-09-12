/** Отзывы. ЗАГЛУШКА — на сайт попадают только approved: true. */
import type { Review } from '@/types';

export const REVIEWS: Review[] = [
  {
    id: 'rv-1',
    authorName: 'Анна К.',
    rating: 5,
    text: 'Укоротили пальто за один день, шов не отличить от фабричного.',
    serviceCategory: 'repair',
    publishedAt: '2026-08-20',
    source: 'site',
    approved: true,
  },
  {
    id: 'rv-2',
    authorName: 'Дмитрий П.',
    rating: 5,
    text: 'Сшили костюм по меркам. Сели идеально, две примерки.',
    serviceCategory: 'custom-fit',
    publishedAt: '2026-07-03',
    source: 'yandex',
    approved: true,
  },
];
