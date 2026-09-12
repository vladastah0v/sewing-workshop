/** Работы. ЗАГЛУШКА — фото загружает Агент 3 в /public/images/portfolio. */
import type { PortfolioItem } from '@/types';

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'pf-1',
    slug: 'coat-refit',
    title: 'Пальто: подгонка по фигуре',
    category: 'repair',
    before: {
      src: '/images/portfolio/placeholder-before.jpg',
      alt: 'Пальто до подгонки: свободный силуэт',
      width: 800,
      height: 1000,
    },
    after: {
      src: '/images/portfolio/placeholder-after.jpg',
      alt: 'Пальто после подгонки: приталенный силуэт',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-08-14',
  },
];
