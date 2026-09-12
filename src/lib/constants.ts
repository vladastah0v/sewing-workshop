/**
 * Константы и лимиты, общие для всех агентов.
 * Владелец файла: Агент 1. Значения синхронизированы с docs/CONTRACTS.md.
 */

import type { NavLink, PriceGroup, ServiceSlug } from '@/types';

/** Базовый URL сайта — для canonical, sitemap и Open Graph. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru';

/**
 * Торговое имя — только для <title>, шапки и подвала.
 * В микроразметке Schema.org организацию называют через
 * CONTACTS.organizationName, а оператора ПДн — через CONTACTS.legalEntity.
 */
export const SITE_NAME = 'Швейная мастерская';

/** Человекочитаемые названия категорий услуг. */
export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  repair: 'Ремонт одежды',
  tailoring: 'Пошив одежды на заказ',
  'custom-fit': 'Пошив по индивидуальным меркам',
  restoration: 'Реставрация и переделка',
  other: 'Другое',
};

/** Названия групп прайса. */
export const PRICE_GROUP_LABELS: Record<PriceGroup, string> = {
  women: 'Женская одежда',
  men: 'Мужская одежда',
  outerwear: 'Верхняя одежда',
  knitwear: 'Трикотаж',
  'leather-fur': 'Кожа и мех',
  wedding: 'Свадебные наряды',
  'home-textile': 'Домашний текстиль',
};

/** Главное меню. Единственный источник — используют Header и Footer. */
export const MAIN_NAV: NavLink[] = [
  {
    label: 'Услуги',
    href: '/services',
    children: [
      { label: 'Ремонт одежды', href: '/services/repair' },
      { label: 'Пошив на заказ', href: '/services/tailoring' },
      { label: 'По индивидуальным меркам', href: '/services/custom-fit' },
      { label: 'Реставрация и переделка', href: '/services/restoration' },
    ],
  },
  { label: 'Цены', href: '/prices' },
  { label: 'Работы', href: '/portfolio' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'О мастерской', href: '/about' },
  { label: 'Как мы работаем', href: '/process' },
  { label: 'Контакты', href: '/contacts' },
];

/** Роуты API — не хардкодить строки в компонентах. */
export const API_ROUTES = {
  leads: '/api/leads',
  reviews: '/api/reviews',
  uploads: '/api/uploads',
} as const;

/** Лимиты форм — валидатор на клиенте и на сервере берёт их отсюда. */
export const FORM_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  messageMax: 1000,
  reviewTextMin: 10,
  reviewTextMax: 1500,
  attachmentsMax: 5,
  attachmentSizeBytes: 10 * 1024 * 1024,
  attachmentMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  /** Быстрее этого времени форму заполняет только бот. */
  minFillMs: 3000,
  /** Дольше этого — метка renderedAt подделана или вкладка провисела сутки. */
  maxFillMs: 12 * 60 * 60 * 1000,
  /** Не больше N заявок с одного IP за окно. */
  rateLimitCount: 5,
  rateLimitWindowMs: 10 * 60 * 1000,
} as const;

/** События аналитики (ТЗ п.7.6). Названия целей менять нельзя. */
export const ANALYTICS_EVENTS = {
  leadSubmit: 'lead_submit',
  leadSuccess: 'lead_success',
  leadError: 'lead_error',
  phoneClick: 'phone_click',
  messengerClick: 'messenger_click',
  reviewSubmit: 'review_submit',
} as const;

/** Брейкпоинты в px — для JS-логики (matchMedia). CSS берёт их из токенов. */
export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
