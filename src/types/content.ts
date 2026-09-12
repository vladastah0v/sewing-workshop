/**
 * Контентные модели. Общий контракт — правится только через docs/CONTRACTS.md.
 * Владелец файла: Агент 1. Остальные импортируют, но не редактируют.
 */

/** Категории услуг верхнего уровня (ТЗ п.4, раздел «Услуги»). */
export type ServiceSlug =
  | 'repair'          // Ремонт одежды
  | 'tailoring'       // Пошив одежды на заказ
  | 'custom-fit'      // Пошив по индивидуальным меркам
  | 'restoration'     // Реставрация и переделка
  | 'other';          // Прочее / затрудняюсь ответить

/** Группы прайса (ТЗ п.5.3). */
export type PriceGroup =
  | 'women'           // Женская одежда
  | 'men'             // Мужская одежда
  | 'outerwear'       // Верхняя одежда
  | 'knitwear'        // Трикотаж
  | 'leather-fur'     // Кожа и мех
  | 'wedding'         // Свадебное
  | 'home-textile';   // Домашний текстиль

export interface ImageAsset {
  /** Путь от /public или абсолютный URL. */
  src: string;
  /** Обязателен: ТЗ п.6.4 требует alt у всех изображений. */
  alt: string;
  width: number;
  height: number;
  /** base64 LQIP для placeholder="blur"; необязателен. */
  blurDataURL?: string;
}

export interface Service {
  id: string;
  slug: string;                 // ЧПУ: /services/[slug]
  category: ServiceSlug;
  title: string;
  shortDescription: string;     // до 140 символов — для карточки
  description?: string;         // для детальной страницы
  image?: ImageAsset;
  iconName?: IconName;
  /** Цена «от», в рублях, целое число. null = «по замерам». */
  priceFrom: number | null;
  /** Срок исполнения в рабочих днях: [min, max]. */
  leadTimeDays: [number, number];
  popular?: boolean;
  seo?: SeoMeta;
}

export interface PriceItem {
  id: string;
  group: PriceGroup;
  title: string;
  /** null = «рассчитывается по замерам». */
  priceFrom: number | null;
  priceTo?: number | null;
  unit?: string;                // «шт.», «м», «за изделие»
  note?: string;
  leadTimeDays?: [number, number];
}

export interface PriceCategoryData {
  group: PriceGroup;
  title: string;
  items: PriceItem[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceSlug;
  description?: string;
  before?: ImageAsset;          // если есть — рендерим BeforeAfterSlider
  after: ImageAsset;            // обязательное «после»
  gallery?: ImageAsset[];
  /** ISO 8601, YYYY-MM-DD. */
  completedAt?: string;
  tags?: string[];
}

export interface Review {
  id: string;
  authorName: string;
  authorPhoto?: ImageAsset;
  /** 1..5 целое. */
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  serviceCategory?: ServiceSlug;
  /** ISO 8601, YYYY-MM-DD. */
  publishedAt: string;
  /** Источник для микроразметки и бейджа. */
  source?: 'site' | 'yandex' | 'google' | '2gis' | 'avito';
  photos?: ImageAsset[];
  /** false = ждёт модерации, на сайт не выводится. */
  approved: boolean;
}

export interface Master {
  id: string;
  name: string;
  role: string;                 // «Портной-закройщик»
  experienceYears: number;
  photo?: ImageAsset;
  bio?: string;
  specialties?: ServiceSlug[];
}

export interface ProcessStepData {
  id: string;
  /** Порядковый номер, начиная с 1. */
  order: number;
  title: string;                // «Заявка», «Замер», «Примерка», «Выдача»
  description: string;
  iconName?: IconName;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: ServiceSlug;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** HTML или MDX-строка — формат фиксируется при подключении CMS. */
  body?: string;
  cover?: ImageAsset;
  publishedAt: string;          // ISO 8601
  readingMinutes?: number;
  tags?: string[];
  seo?: SeoMeta;
}

/** День недели: 1 = понедельник ... 7 = воскресенье (ISO-8601). */
export type WeekdayIso = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface WorkingHours {
  day: WeekdayIso;
  /** «HH:mm» в 24-часовом формате; null/null = выходной. */
  opensAt: string | null;
  closesAt: string | null;
}

export interface ContactInfoData {
  organizationName: string;
  phone: string;                // E.164: +79991234567
  phoneDisplay: string;         // «+7 (999) 123-45-67»
  email: string;
  addressLine: string;
  city: string;
  postalCode?: string;
  /** [широта, долгота] для карты и Schema.org. */
  coordinates: [number, number];
  workingHours: WorkingHours[];
  messengers: MessengerLink[];
  /** Часовой пояс IANA — нужен для бейджа «Открыто/Закрыто». */
  timeZone: string;             // «Europe/Moscow»
}

export interface MessengerLink {
  kind: 'whatsapp' | 'telegram' | 'viber' | 'vk' | 'max';
  /** Готовый href, включая протокол. */
  href: string;
  label: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  /** Абсолютный путь от корня: «/services/repair». */
  canonicalPath?: string;
  ogImage?: ImageAsset;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  /** Последний элемент — без href. */
  href?: string;
}

/**
 * Реестр иконок. Расширяется Агентом 1 по запросу;
 * произвольные строки запрещены, чтобы не разъезжался набор.
 */
export type IconName =
  | 'scissors' | 'needle' | 'ruler' | 'hanger' | 'zipper' | 'shirt' | 'dress'
  | 'clock' | 'shield' | 'star' | 'quote' | 'sparkle'
  | 'phone' | 'mail' | 'map-pin' | 'whatsapp' | 'telegram' | 'viber'
  | 'chevron-left' | 'chevron-right' | 'chevron-down' | 'arrow-right'
  | 'close' | 'menu' | 'check' | 'alert' | 'info' | 'upload' | 'image';
