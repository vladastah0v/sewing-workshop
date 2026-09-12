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
      { id: 'p-3', group: 'women', title: 'Заменить молнию в платье', priceFrom: 900, leadTimeDays: [1, 2] },
      { id: 'p-4', group: 'women', title: 'Сузить брюки по всей длине', priceFrom: 1100, priceTo: 1900, leadTimeDays: [2, 3] },
      { id: 'p-5', group: 'women', title: 'Пошив юбки', priceFrom: 4500, unit: 'за изделие', note: 'Без стоимости ткани', leadTimeDays: [7, 14] },
      { id: 'p-6', group: 'women', title: 'Пошив платья по меркам', priceFrom: null, note: 'Зависит от модели и ткани', leadTimeDays: [14, 30] },
    ],
  },
  {
    group: 'men',
    title: PRICE_GROUP_LABELS.men,
    items: [
      { id: 'p-7', group: 'men', title: 'Подшив брюк', priceFrom: 600, leadTimeDays: [1, 1] },
      { id: 'p-8', group: 'men', title: 'Ушить пиджак по фигуре', priceFrom: 2000, priceTo: 3800, leadTimeDays: [3, 5] },
      { id: 'p-9', group: 'men', title: 'Укоротить рукава пиджака', priceFrom: 1400, note: 'С переносом пуговиц', leadTimeDays: [2, 3] },
      { id: 'p-10', group: 'men', title: 'Заменить молнию в брюках', priceFrom: 800, leadTimeDays: [1, 2] },
      { id: 'p-11', group: 'men', title: 'Пошив рубашки по меркам', priceFrom: 5500, unit: 'за изделие', leadTimeDays: [10, 18] },
      { id: 'p-12', group: 'men', title: 'Пошив костюма по меркам', priceFrom: null, note: 'Две примерки, расчёт после замера', leadTimeDays: [21, 45] },
    ],
  },
  {
    group: 'outerwear',
    title: PRICE_GROUP_LABELS.outerwear,
    items: [
      { id: 'p-13', group: 'outerwear', title: 'Замена молнии в куртке', priceFrom: 1500, priceTo: 2800, leadTimeDays: [2, 4] },
      { id: 'p-14', group: 'outerwear', title: 'Замена подкладки', priceFrom: null, note: 'Зависит от изделия и материала', leadTimeDays: [4, 8] },
      { id: 'p-15', group: 'outerwear', title: 'Укоротить пальто', priceFrom: 2200, leadTimeDays: [3, 5] },
      { id: 'p-16', group: 'outerwear', title: 'Ушить пуховик по фигуре', priceFrom: 2600, note: 'С перестёжкой секций', leadTimeDays: [4, 7] },
      { id: 'p-17', group: 'outerwear', title: 'Ремонт кармана', priceFrom: 700, leadTimeDays: [1, 2] },
    ],
  },
  {
    group: 'knitwear',
    title: PRICE_GROUP_LABELS.knitwear,
    items: [
      { id: 'p-18', group: 'knitwear', title: 'Подшив трикотажа плоскошовной машиной', priceFrom: 650, leadTimeDays: [1, 2] },
      { id: 'p-19', group: 'knitwear', title: 'Ушить трикотажное платье', priceFrom: 1300, leadTimeDays: [2, 3] },
      { id: 'p-20', group: 'knitwear', title: 'Штопка зацепки на вязаном изделии', priceFrom: 500, unit: 'за место', leadTimeDays: [1, 3] },
      { id: 'p-21', group: 'knitwear', title: 'Восстановить резинку манжета', priceFrom: 900, unit: 'за пару', leadTimeDays: [2, 4] },
    ],
  },
  {
    group: 'leather-fur',
    title: PRICE_GROUP_LABELS['leather-fur'],
    items: [
      { id: 'p-22', group: 'leather-fur', title: 'Ушить кожаную куртку', priceFrom: 3200, leadTimeDays: [4, 7] },
      { id: 'p-23', group: 'leather-fur', title: 'Замена молнии в кожаном изделии', priceFrom: 2400, leadTimeDays: [3, 6] },
      { id: 'p-24', group: 'leather-fur', title: 'Ремонт разрыва на коже', priceFrom: 1500, unit: 'за место', note: 'Результат зависит от кожи — оцениваем при осмотре', leadTimeDays: [3, 5] },
      { id: 'p-25', group: 'leather-fur', title: 'Перекрой мехового изделия', priceFrom: null, note: 'Только после осмотра меха', leadTimeDays: [14, 30] },
    ],
  },
  {
    group: 'wedding',
    title: PRICE_GROUP_LABELS.wedding,
    items: [
      { id: 'p-26', group: 'wedding', title: 'Подгонка свадебного платья по фигуре', priceFrom: 4500, priceTo: 9000, note: 'Две примерки включены', leadTimeDays: [5, 14] },
      { id: 'p-27', group: 'wedding', title: 'Укоротить свадебное платье с подъюбником', priceFrom: 3800, leadTimeDays: [4, 8] },
      { id: 'p-28', group: 'wedding', title: 'Переделка свадебного платья в коктейльное', priceFrom: null, note: 'Расчёт после эскиза', leadTimeDays: [10, 21] },
      { id: 'p-29', group: 'wedding', title: 'Срочная подгонка, менее 3 дней до даты', priceFrom: 7000, note: 'По загрузке мастерской', leadTimeDays: [1, 2] },
    ],
  },
  {
    group: 'home-textile',
    title: PRICE_GROUP_LABELS['home-textile'],
    items: [
      { id: 'p-30', group: 'home-textile', title: 'Подшив штор', priceFrom: 450, unit: 'за метр', leadTimeDays: [2, 4] },
      { id: 'p-31', group: 'home-textile', title: 'Пошив штор с тесьмой', priceFrom: 900, unit: 'за метр', note: 'Без стоимости ткани', leadTimeDays: [5, 10] },
      { id: 'p-32', group: 'home-textile', title: 'Пошив чехла на подушку', priceFrom: 600, unit: 'шт.', leadTimeDays: [2, 4] },
      { id: 'p-33', group: 'home-textile', title: 'Пошив постельного комплекта', priceFrom: 3500, unit: 'за комплект', leadTimeDays: [5, 10] },
    ],
  },
];
