/**
 * Микроразметка Schema.org и общие SEO-хелперы (ТЗ п.7.4).
 * Владелец файла: Агент 1 (общая зона).
 *
 * Написан Агентом 3 в src/content/seo.ts, перенесён сюда по его запросу
 * (docs/requests-features.md, пункт 2): билдеры нужны и внутренним страницам,
 * и секциям главной, дублировать их в двух зонах нельзя.
 *
 * BreadcrumbList здесь НЕ собирается — его отдаёт готовый компонент
 * layout/Breadcrumbs, чтобы разметка и видимые крошки не разъезжались.
 */
import type { ContactInfoData, FaqItem, Review, Service, WeekdayIso } from '@/types';
import { SITE_URL } from '@/lib/constants';

/** Schema.org ждёт английские имена дней; ISO-номер недели → строка. */
const SCHEMA_WEEKDAY: Record<WeekdayIso, string> = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

/** Абсолютный URL из пути от корня: '/prices' → 'https://site.ru/prices'. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Пропсы для <script type="application/ld+json">.
 * Компонент под это заводить нельзя — реестр компонентов закрыт (docs/CONTRACTS.md п.8.4).
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}

/** Организация: основа для LocalBusiness и ссылок provider/publisher. */
export function localBusinessJsonLd(contacts: ContactInfoData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: contacts.organizationName,
    description:
      'Швейная мастерская: ремонт и подгонка одежды, пошив на заказ и по индивидуальным ' +
      'меркам, реставрация кожи и меха.',
    url: SITE_URL,
    telephone: contacts.phone,
    email: contacts.email,
    image: absoluteUrl('/images/services/repair.png'),
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Наличные, банковская карта',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contacts.addressLine,
      addressLocality: contacts.city,
      ...(contacts.postalCode ? { postalCode: contacts.postalCode } : {}),
      addressCountry: 'RU',
    },
    // geo отдаём только с выверенными координатами: ошибочный пин в выдаче
    // хуже отсутствующего — Яндекс и Google уводят клиента не туда.
    ...(contacts.coordinates
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: contacts.coordinates[0],
            longitude: contacts.coordinates[1],
          },
        }
      : {}),
    openingHoursSpecification: contacts.workingHours
      .filter((day) => day.opensAt !== null && day.closesAt !== null)
      .map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${SCHEMA_WEEKDAY[day.day]}`,
        opens: day.opensAt,
        closes: day.closesAt,
      })),
    sameAs: contacts.messengers.map((messenger) => messenger.href),
  };
}

/** Отдельная услуга: страница /services/[slug]. */
export function serviceJsonLd(service: Service, contacts: ContactInfoData) {
  const path = service.seo?.canonicalPath ?? `/services/${service.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: service.title,
    description: service.description ?? service.shortDescription,
    serviceType: service.title,
    url: absoluteUrl(path),
    ...(service.image ? { image: absoluteUrl(service.image.src) } : {}),
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#organization`,
      name: contacts.organizationName,
      telephone: contacts.phone,
    },
    areaServed: {
      '@type': 'City',
      name: contacts.city,
    },
    // priceFrom === null означает «по замерам» — тогда offers без цены,
    // иначе поисковик покажет несуществующий ноль.
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(path),
      ...(service.priceFrom !== null
        ? {
            price: service.priceFrom,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: service.priceFrom,
              priceCurrency: 'RUB',
              valueAddedTaxIncluded: true,
            },
          }
        : {}),
    },
  };
}

/** Один отзыв — вкладывается в LocalBusiness на странице /reviews. */
function reviewJsonLd(review: Review) {
  return {
    '@type': 'Review',
    author: { '@type': 'Person', name: review.authorName },
    datePublished: review.publishedAt,
    reviewBody: review.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/**
 * Страница отзывов: организация с AggregateRating и вложенными Review.
 * Отдельный @type Review без родителя Google игнорирует, поэтому оборачиваем в LocalBusiness.
 */
export function reviewsPageJsonLd(
  reviews: Review[],
  averageRating: number,
  contacts: ContactInfoData,
) {
  return {
    ...localBusinessJsonLd(contacts),
    ...(reviews.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating,
            reviewCount: reviews.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.map(reviewJsonLd),
        }
      : {}),
  };
}

/** Частые вопросы — FAQPage. */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Список — для /services и /portfolio. */
export function itemListJsonLd(entries: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(entry.url),
    })),
  };
}
