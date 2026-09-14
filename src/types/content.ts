/**
 * Контентные модели. Общий контракт — правится только через docs/CONTRACTS.md.
 * Владелец файла: Агент 1. Остальные импортируют, но не редактируют.
 */

/** Категории услуг верхнего уровня (ТЗ п.4, раздел «Услуги»). */
export type ServiceSlug =
  | 'repair'          // Ремонт одежды
  | 'tailoring'       // Пошив одежды на заказ
  | 'custom-fit'      // Пошив по индивидуальным меркам
  | 'other';          // Прочее / затрудняюсь ответить

/** Группы прайса (ТЗ п.5.3). */
export type PriceGroup =
  | 'women'           // Женская одежда
  | 'men'             // Мужская одежда
  | 'outerwear'       // Верхняя одежда
  | 'knitwear'        // Трикотаж
  | 'home-textile'    // Домашний текстиль
  | 'other';          // Прочее

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

/** День недели: 1 = понедельник ... 7 = воскресенье (ISO-8601). */
export type WeekdayIso = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface WorkingHours {
  day: WeekdayIso;
  /** «HH:mm» в 24-часовом формате; null/null = выходной. */
  opensAt: string | null;
  closesAt: string | null;
}

/**
 * Реквизиты оператора персональных данных (152-ФЗ).
 * Нужны на странице политики: там называют юрлицо, а не торговое имя.
 */
export interface LegalEntity {
  /** Полное наименование: «ИП Иванов Иван Иванович» или «ООО "Ателье"». */
  name: string;
  inn: string;
  /** ОГРН или ОГРНИП. */
  ogrn: string;
  /** Юридический адрес, если отличается от адреса мастерской. */
  legalAddress?: string;
}

export interface ContactInfoData {
  organizationName: string;
  phone: string;                // E.164: +79991234567
  phoneDisplay: string;         // «+7 (999) 123-45-67»
  email: string;
  addressLine: string;
  city: string;
  postalCode?: string;
  /**
   * [широта, долгота] для Schema.org. Необязательны: пока точка не выверена
   * по карте, geo в микроразметку не попадает — неверный пин хуже отсутствия.
   */
  coordinates?: [number, number];
  /** Адрес строкой для виджета карты, когда координат ещё нет. */
  mapQuery?: string;
  /** Как пройти/проехать — выводится рядом с картой. */
  directions?: string;
  workingHours: WorkingHours[];
  messengers: MessengerLink[];
  /** Часовой пояс IANA — нужен для бейджа «Открыто/Закрыто». */
  timeZone: string;             // «Europe/Moscow»
  /** Реквизиты для политики конфиденциальности. Пока не заданы — undefined. */
  legalEntity?: LegalEntity;
}

/**
 * Мессенджер рядом с телефоном. href необязателен: пока у мастерской нет
 * реальных аккаунтов, значки выводятся как косметика (span, не ссылка).
 */
export interface MessengerLink {
  kind: 'whatsapp' | 'telegram' | 'viber' | 'vk' | 'max';
  href?: string;
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
  | 'users' | 'award' | 'truck' | 'wallet' | 'pencil'
  | 'phone' | 'mail' | 'map-pin' | 'whatsapp' | 'telegram' | 'viber' | 'max'
  | 'chevron-left' | 'chevron-right' | 'chevron-down' | 'arrow-right'
  | 'close' | 'menu' | 'check' | 'alert' | 'info' | 'upload' | 'image';
