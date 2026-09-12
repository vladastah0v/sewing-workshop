/**
 * Отзывы. Владелец файла: Агент 3.
 * На сайт выводятся только `approved: true` — неодобренные лежат здесь же,
 * чтобы фильтр и страница модерации работали на реальной форме данных.
 */
import type { Review, ServiceSlug } from '@/types';

export const REVIEWS: Review[] = [
  {
    id: 'rv-1',
    authorName: 'Анна К.',
    rating: 5,
    text:
      'Укоротили пальто за один день, шов не отличить от фабричного. Отдельное спасибо ' +
      'за то, что сразу сказали точную сумму и не стали её менять, когда работа была готова.',
    serviceCategory: 'repair',
    publishedAt: '2026-08-20',
    source: 'site',
    approved: true,
  },
  {
    id: 'rv-2',
    authorName: 'Дмитрий П.',
    rating: 5,
    text:
      'Сшили костюм по меркам. У меня нестандартная фигура, в магазинах всё сидит мешком, ' +
      'а тут сели идеально с двух примерок. Ткань помогли выбрать сами, я в этом не разбираюсь.',
    serviceCategory: 'custom-fit',
    publishedAt: '2026-07-03',
    source: 'yandex',
    approved: true,
  },
  {
    id: 'rv-3',
    authorName: 'Ольга В.',
    rating: 5,
    text:
      'Свадебное платье подгоняли за неделю до росписи. Взялись, когда в двух других ателье ' +
      'отказали из-за сроков. Сделали две примерки, платье сидело как влитое.',
    serviceCategory: 'repair',
    publishedAt: '2026-07-22',
    source: 'site',
    approved: true,
  },
  {
    id: 'rv-4',
    authorName: 'Сергей М.',
    rating: 4,
    text:
      'Меняли молнию в кожаной куртке. Работой доволен, молния плотная и ходит мягко. ' +
      'Сроки сдвинулись на два дня, но предупредили заранее, так что без претензий.',
    serviceCategory: 'restoration',
    publishedAt: '2026-06-15',
    source: '2gis',
    approved: true,
  },
  {
    id: 'rv-5',
    authorName: 'Екатерина Л.',
    rating: 5,
    text:
      'Перешили мамину шубу в короткую куртку. Честно предупредили, что мех местами слабый, ' +
      'и предложили укоротить сильнее, чем я хотела. Получилось лучше, чем я себе представляла.',
    serviceCategory: 'restoration',
    publishedAt: '2026-05-18',
    source: 'yandex',
    approved: true,
  },
  {
    id: 'rv-6',
    authorName: 'Наталья Ж.',
    rating: 5,
    text: 'Подшили брюки мужу при мне, за двадцать минут. Манжету сохранили.',
    serviceCategory: 'repair',
    publishedAt: '2026-05-06',
    source: 'site',
    approved: true,
  },
  {
    id: 'rv-7',
    authorName: 'Игорь Т.',
    rating: 4,
    text:
      'Шили шторы по размерам окна. Ткань свою приносил, сразу посчитали метраж и сказали, ' +
      'что не хватит на запах — пришлось докупать. Лучше бы это выяснилось до того, как я купил.',
    serviceCategory: 'other',
    publishedAt: '2026-04-11',
    source: 'google',
    approved: true,
  },
  {
    id: 'rv-8',
    authorName: 'Мария С.',
    rating: 5,
    text:
      'Повторили мою любимую блузу, которая истёрлась за пять лет носки. Сняли лекала прямо ' +
      'со старой вещи. Новая села точно так же, разве что шёлк приятнее на ощупь.',
    serviceCategory: 'tailoring',
    publishedAt: '2026-04-14',
    source: 'site',
    approved: true,
  },
  {
    id: 'rv-9',
    authorName: 'Алексей Р.',
    rating: 5,
    text: 'Ушили пиджак в плечах. Сделали за три дня, как и обещали.',
    serviceCategory: 'repair',
    publishedAt: '2026-03-29',
    source: 'avito',
    approved: true,
  },
  {
    id: 'rv-10',
    authorName: 'Вероника Д.',
    rating: 5,
    text:
      'Отзыв ждёт модерации и на сайт пока не выводится — заглушка для проверки фильтра.',
    serviceCategory: 'tailoring',
    publishedAt: '2026-09-10',
    source: 'site',
    approved: false,
  },
];

/** Только опубликованные отзывы — единственный источник для страниц и секций. */
export const APPROVED_REVIEWS: Review[] = REVIEWS.filter((review) => review.approved);

/** Средний балл для микроразметки AggregateRating. Округление до одного знака. */
export function getAverageRating(reviews: Review[] = APPROVED_REVIEWS): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/** Сколько опубликованных отзывов в каждой категории — для фильтра на странице. */
export function countReviewsByCategory(
  reviews: Review[] = APPROVED_REVIEWS,
): Record<ServiceSlug, number> {
  const counts: Record<ServiceSlug, number> = {
    repair: 0,
    tailoring: 0,
    'custom-fit': 0,
    restoration: 0,
    other: 0,
  };
  for (const review of reviews) {
    if (review.serviceCategory) counts[review.serviceCategory] += 1;
  }
  return counts;
}
