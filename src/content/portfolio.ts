/**
 * Работы мастерской. Владелец файла: Агент 3.
 *
 * !!! БЛОКЕР ПЕРЕД ЗАПУСКОМ !!!
 * Файлы в /public/images/portfolio — не фотографии, а абстрактные текстуры
 * ткани. При этом alt ниже описывает конкретные изделия («бежевое шерстяное
 * пальто до подгонки»). Это расхождение нельзя публиковать:
 *   - alt обязан описывать то, что на изображении (WCAG 2.1, ТЗ п.6.4);
 *   - портфолио из образцов ткани вместо работ вводит клиента в заблуждение.
 * Лечится только реальными снимками заказчика (открытый вопрос №4
 * в docs/CONTRACTS.md). Alt-тексты писать заново под фактические фото.
 */
import type { PortfolioItem } from '@/types';

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'pf-1',
    slug: 'coat-refit',
    title: 'Пальто: подгонка по фигуре',
    category: 'repair',
    description:
      'Шерстяное пальто на два размера больше нужного. Убрали объём по боковым швам ' +
      'и в спинке, укоротили рукава с переносом шлицы.',
    before: {
      src: '/images/portfolio/coat-before.png',
      alt: 'Бежевое шерстяное пальто до подгонки: свободный силуэт, длинные рукава',
      width: 800,
      height: 1000,
    },
    after: {
      src: '/images/portfolio/coat-after.png',
      alt: 'То же пальто после подгонки: приталенный силуэт, рукава по запястье',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-08-14',
    tags: ['пальто', 'подгонка по фигуре'],
  },
  {
    id: 'pf-2',
    slug: 'jacket-zipper',
    title: 'Куртка: замена молнии',
    category: 'repair',
    description:
      'Разъёмная молния разошлась по всей длине. Поставили новую усиленную, ' +
      'сохранили фабричную отстрочку планки.',
    before: {
      src: '/images/portfolio/jacket-before.png',
      alt: 'Серая куртка с разошедшейся молнией до ремонта',
      width: 800,
      height: 1000,
    },
    after: {
      src: '/images/portfolio/jacket-after.png',
      alt: 'Синяя куртка с новой разъёмной молнией после ремонта',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-08-02',
    tags: ['куртка', 'молния'],
  },
  {
    id: 'pf-6',
    slug: 'trousers-hem',
    title: 'Брюки: подшив с сохранением манжеты',
    category: 'repair',
    description:
      'Классические брюки длиннее на 6 см. Укоротили, восстановив фабричную манжету ' +
      'и шаг отстрочки.',
    before: {
      src: '/images/portfolio/trousers-before.png',
      alt: 'Серые классические брюки до подшива: излишняя длина',
      width: 800,
      height: 1000,
    },
    after: {
      src: '/images/portfolio/trousers-after.png',
      alt: 'Те же брюки после подшива: манжета сохранена, длина по щиколотку',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-05-30',
    tags: ['брюки', 'подшив'],
  },
  {
    id: 'pf-8',
    slug: 'knit-dress',
    title: 'Трикотажное платье на заказ',
    category: 'tailoring',
    description:
      'Платье-футляр из плотного трикотажа по эскизу заказчицы. Швы выполнены ' +
      'плоскошовной машиной — не стягивают и тянутся вместе с тканью.',
    after: {
      src: '/images/portfolio/knit-after.png',
      alt: 'Терракотовое трикотажное платье-футляр на манекене',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-04-26',
    tags: ['трикотаж', 'пошив'],
  },
  {
    id: 'pf-9',
    slug: 'silk-blouse',
    title: 'Шёлковая блуза по образцу',
    category: 'tailoring',
    description:
      'Повторили любимую блузу заказчицы, которая износилась: сняли лекала со старой вещи ' +
      'и сшили из шёлка с потайной застёжкой.',
    after: {
      src: '/images/portfolio/blouse-after.png',
      alt: 'Кремовая шёлковая блуза с потайной застёжкой на манекене',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-04-08',
    tags: ['шёлк', 'по образцу'],
  },
  {
    id: 'pf-10',
    slug: 'curtains-linen',
    title: 'Льняные шторы для гостиной',
    category: 'other',
    description:
      'Готовые шторы не подошли по высоте потолка. Сшили новые из льна по размерам окна, ' +
      'с потайной тесьмой под карниз.',
    before: {
      src: '/images/portfolio/curtains-before.png',
      alt: 'Короткие фабричные шторы до замены',
      width: 800,
      height: 1000,
    },
    after: {
      src: '/images/portfolio/curtains-after.png',
      alt: 'Льняные шторы в пол, сшитые по размерам окна',
      width: 800,
      height: 1000,
    },
    completedAt: '2026-03-21',
    tags: ['текстиль', 'шторы'],
  },
];

/** Поиск работы по ЧПУ — на случай будущей детальной страницы. */
export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return PORTFOLIO.find((item) => item.slug === slug);
}
