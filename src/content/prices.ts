/** Прайс-лист. ЗАГЛУШКА — цены подставляет Агент 3 из данных заказчика. */
import type { PriceCategoryData } from '@/types';
import { PRICE_GROUP_LABELS } from '@/lib/constants';

export const PRICES: PriceCategoryData[] = [
  {
    group: 'women',
    title: PRICE_GROUP_LABELS.women,
    items: [
      { id: 'p-1', group: 'women', title: 'Укоротить юбку', priceFrom: 700, leadTimeDays: [1, 2] },
      { id: 'p-2', group: 'women', title: 'Ушить платье по фигуре', priceFrom: 1200 },
    ],
  },
  {
    group: 'men',
    title: PRICE_GROUP_LABELS.men,
    items: [
      { id: 'p-3', group: 'men', title: 'Подшив брюк', priceFrom: 600, leadTimeDays: [1, 1] },
      { id: 'p-4', group: 'men', title: 'Ушить пиджак', priceFrom: 2000 },
    ],
  },
  {
    group: 'outerwear',
    title: PRICE_GROUP_LABELS.outerwear,
    items: [
      { id: 'p-5', group: 'outerwear', title: 'Замена молнии в куртке', priceFrom: 1500 },
      { id: 'p-6', group: 'outerwear', title: 'Замена подкладки', priceFrom: null, note: 'Зависит от изделия' },
    ],
  },
];
