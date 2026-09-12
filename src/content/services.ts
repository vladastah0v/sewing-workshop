/** Услуги. ЗАГЛУШКА — наполняет Агент 3 по списку заказчика. */
import type { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    slug: 'repair',
    category: 'repair',
    title: 'Ремонт одежды',
    shortDescription: 'Укоротить, ушить, заменить молнию или подкладку.',
    priceFrom: 500,
    leadTimeDays: [1, 2],
    iconName: 'needle',
    popular: true,
  },
  {
    id: 'srv-2',
    slug: 'tailoring',
    category: 'tailoring',
    title: 'Пошив на заказ',
    shortDescription: 'Сошьём изделие по вашему эскизу или образцу.',
    priceFrom: 6000,
    leadTimeDays: [7, 21],
    iconName: 'scissors',
  },
  {
    id: 'srv-3',
    slug: 'custom-fit',
    category: 'custom-fit',
    title: 'Пошив по меркам',
    shortDescription: 'Снимем мерки и сошьём точно по фигуре.',
    priceFrom: null,
    leadTimeDays: [10, 30],
    iconName: 'ruler',
  },
  {
    id: 'srv-4',
    slug: 'restoration',
    category: 'restoration',
    title: 'Реставрация и переделка',
    shortDescription: 'Вернём вещи вид или переделаем под новый образ.',
    priceFrom: 1500,
    leadTimeDays: [3, 10],
    iconName: 'sparkle',
  },
];
