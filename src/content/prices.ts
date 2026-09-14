/**
 * Прайс-лист. Владелец файла: Агент 3.
 * Цены ориентировочные — точные значения даёт заказчик (открытый вопрос №3
 * в docs/CONTRACTS.md). `null` = «рассчитывается по замерам».
 */
import type { PriceCategoryData } from '@/types';
import { PRICE_GROUP_LABELS } from '@/lib/constants';

export const PRICES: PriceCategoryData[] = [
  {
    group: 'women',
    title: PRICE_GROUP_LABELS.women,
    items: [
      { id: 'p-1', group: 'women', title: 'Укоротить юбку или платье', priceFrom: 700, priceTo: 1400, leadTimeDays: [1, 2] },
      { id: 'p-2', group: 'women', title: 'Ушить платье по фигуре', priceFrom: 1200, priceTo: 2600, leadTimeDays: [2, 4] },
      { id: 'p-3', group: 'women', title: 'Заменить молнию в платье', priceFrom: 700, leadTimeDays: [1, 2] },
      { id: 'p-4', group: 'women', title: 'Сузить брюки по всей длине', priceFrom: 1000, leadTimeDays: [2, 3] },
      { id: 'p-5', group: 'women', title: 'Пошив юбки', priceFrom: 3000, unit: 'за изделие', note: 'Без стоимости ткани', leadTimeDays: [7, 14] },
      { id: 'p-6', group: 'women', title: 'Пошив платья по меркам', priceFrom: null, note: 'Зависит от модели и ткани', leadTimeDays: [14, 30] },
      { id: 'p-34', group: 'women', title: 'Женский корсет', priceFrom: 6500 },
      { id: 'p-35', group: 'women', title: 'Нижнее бельё', priceFrom: 3500 },
    ],
  },
  {
    group: 'men',
    title: PRICE_GROUP_LABELS.men,
    items: [
      { id: 'p-7', group: 'men', title: 'Укоротить брюки и джинсы', priceFrom: 500, leadTimeDays: [1, 1] },
      { id: 'p-8', group: 'men', title: 'Ушить пиджак по фигуре', priceFrom: 2000, priceTo: 3800, leadTimeDays: [3, 5] },
      { id: 'p-9', group: 'men', title: 'Укоротить рукава пиджака', priceFrom: 1400, note: 'С переносом пуговиц', leadTimeDays: [2, 3] },
      { id: 'p-10', group: 'men', title: 'Заменить молнию в брюках', priceFrom: 800, leadTimeDays: [1, 2] },
    ],
  },
  {
    group: 'outerwear',
    title: PRICE_GROUP_LABELS.outerwear,
    items: [
      { id: 'p-13', group: 'outerwear', title: 'Замена молнии в куртке', priceFrom: 1000, priceTo: 1500, leadTimeDays: [2, 4] },
      { id: 'p-14', group: 'outerwear', title: 'Замена подкладки', priceFrom: null, note: 'Зависит от изделия и материала', leadTimeDays: [4, 8] },
      { id: 'p-15', group: 'outerwear', title: 'Укоротить пальто', priceFrom: 1500, leadTimeDays: [3, 5] },
      { id: 'p-16', group: 'outerwear', title: 'Ушить пуховик по фигуре', priceFrom: 2600, note: 'С перестёжкой секций', leadTimeDays: [4, 7] },
      { id: 'p-17', group: 'outerwear', title: 'Ремонт кармана', priceFrom: 700, leadTimeDays: [1, 2] },
    ],
  },
  {
    group: 'knitwear',
    title: PRICE_GROUP_LABELS.knitwear,
    items: [
      { id: 'p-18', group: 'knitwear', title: 'Подшив трикотажа плоскошовной машиной', priceFrom: 650, leadTimeDays: [1, 2] },
      { id: 'p-19', group: 'knitwear', title: 'Ушить трикотажное платье', priceFrom: 800, leadTimeDays: [2, 3] },
    ],
  },
  {
    group: 'home-textile',
    title: PRICE_GROUP_LABELS['home-textile'],
    items: [
      { id: 'p-30', group: 'home-textile', title: 'Подшив штор', priceFrom: 200, unit: 'за метр', note: 'С тесьмой — от 400 ₽', leadTimeDays: [2, 4] },
      { id: 'p-31', group: 'home-textile', title: 'Пошив штор', priceFrom: 500, unit: 'за метр', note: 'Без стоимости ткани', leadTimeDays: [5, 10] },
      { id: 'p-32', group: 'home-textile', title: 'Пошив чехла на подушку', priceFrom: 600, unit: 'шт.', leadTimeDays: [2, 4] },
      { id: 'p-33', group: 'home-textile', title: 'Пошив постельного комплекта', priceFrom: 3500, unit: 'за комплект', leadTimeDays: [5, 10] },
    ],
  },
  {
    group: 'other',
    title: PRICE_GROUP_LABELS.other,
    items: [
      { id: 'p-36', group: 'other', title: 'Купальники', priceFrom: 2000 },
      { id: 'p-37', group: 'other', title: 'Одежда для собак', priceFrom: 2500 },
      { id: 'p-38', group: 'other', title: 'Сценические костюмы (косплей)', priceFrom: null, note: 'Расчёт по меркам заказчика' },
      { id: 'p-39', group: 'other', title: 'Пошив одежды из эко-кожи', priceFrom: 3000 },
    ],
  },
];
