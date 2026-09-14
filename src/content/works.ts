/**
 * Фотографии работ мастерской для карусели на главной и на /portfolio.
 * Подписей и названий на сайте нет — решение заказчика от 14.09.2026.
 * alt не выводится на странице, он нужен скринридерам и поисковикам.
 */
import type { ImageAsset } from '@/types';

export const WORKS: ImageAsset[] = [
  { src: '/images/works/work-01.jpg', alt: 'Купальник', width: 818, height: 1089 },
  { src: '/images/works/work-02.jpg', alt: 'Купальник', width: 1200, height: 1598 },
  { src: '/images/works/work-03.jpg', alt: 'Зимняя куртка из эко-кожи', width: 868, height: 1156 },
  { src: '/images/works/work-04.jpg', alt: 'Сценический костюм', width: 1200, height: 1598 },
  { src: '/images/works/work-05.jpg', alt: 'Сценический костюм', width: 774, height: 1032 },
  { src: '/images/works/work-06.jpg', alt: 'Брюки из эко-кожи', width: 819, height: 1091 },
  { src: '/images/works/work-07.jpg', alt: 'Вечернее платье', width: 868, height: 1156 },
  { src: '/images/works/work-08.jpg', alt: 'Вечернее платье', width: 774, height: 1032 },
  { src: '/images/works/work-09.jpg', alt: 'Вечернее платье', width: 774, height: 1032 },
  { src: '/images/works/work-10.jpg', alt: 'Детское праздничное платье', width: 868, height: 1156 },
  { src: '/images/works/work-11.jpg', alt: 'Концертное платье', width: 868, height: 1156 },
  { src: '/images/works/work-12.jpg', alt: 'Одежда для собаки', width: 868, height: 1156 },
  { src: '/images/works/work-13.jpg', alt: 'Одежда для собаки', width: 630, height: 688 },
  { src: '/images/works/work-14.jpg', alt: 'Шторы', width: 868, height: 1156 },
];

/** Остальные работы — альбом мастерской на Яндекс Диске. */
export const WORKS_ALBUM_URL = 'https://disk.yandex.ru/a/yXyHsdEiv06Y5g';
