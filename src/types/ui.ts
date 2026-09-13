/**
 * Контракты пропсов общих компонентов.
 * Компонент физически создаёт один агент, а импортируют все —
 * поэтому сигнатура фиксируется здесь ДО написания кода.
 * Владелец файла: Агент 1. Изменения — только через docs/CONTRACTS.md.
 */

import type { ReactNode } from 'react';
import type { ApiError, LeadSource, LeadResponseData, ReviewResponseData } from './api';
import type {
  BreadcrumbItem,
  ContactInfoData,
  FaqItem,
  IconName,
  ImageAsset,
  Master,
  PortfolioItem,
  PriceCategoryData,
  ProcessStepData,
  Review,
  Service,
  ServiceSlug,
} from './content';

/** Базовые пропсы, которые принимает КАЖДЫЙ компонент проекта. */
export interface BaseProps {
  className?: string;
  /** Для якорной навигации и целей аналитики. */
  id?: string;
}

/* ------------------------------------------------------------------ */
/* UI-примитивы (src/components/ui) — Агент 1                          */
/* ------------------------------------------------------------------ */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant; // default: 'primary'
  size?: ButtonSize; // default: 'md'
  /** Если задан — рендерится ссылка, иначе button. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Показывает спиннер и блокирует клик (ТЗ п.6.2). */
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  onClick?: () => void;
  children: ReactNode;
}

export interface IconProps extends BaseProps {
  name: IconName;
  /** px; по умолчанию 24. */
  size?: number;
  /** Подпись для скринридера. Без неё иконка aria-hidden. */
  label?: string;
}

export interface FieldProps extends BaseProps {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface FormFieldProps extends FieldProps {
  /** id контрола внутри — связывает label, подсказку и сообщение об ошибке. */
  controlId: string;
  children: ReactNode;
}

export interface InputProps extends FieldProps {
  type?: 'text' | 'tel' | 'email' | 'number' | 'date' | 'time';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export interface TextareaProps extends FieldProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  rows?: number; // default: 4
  maxLength?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends FieldProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export interface CheckboxProps extends BaseProps {
  name: string;
  /** Может содержать ссылку на политику конфиденциальности. */
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface CardProps extends BaseProps {
  as?: 'div' | 'article' | 'li';
  padding?: 'none' | 'sm' | 'md' | 'lg'; // default: 'md'
  /** hover/focus-состояния для кликабельных карточек. */
  interactive?: boolean;
  children: ReactNode;
}

export interface BadgeProps extends BaseProps {
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'error';
  children: ReactNode;
}

export interface RatingProps extends BaseProps {
  /** 0..5, допускается дробное для среднего балла. */
  value: number;
  /** Подпись над звёздами. Только для интерактивного режима. */
  label?: string;
  /** Отмечает поле обязательным (звёздочка + подпись для скринридера). */
  required?: boolean;
  /** Текст ошибки; связывается со звёздами через aria-describedby. */
  error?: string;
  /** Если задан — компонент интерактивный (форма отзыва). */
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export interface SpinnerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string; // default: Загрузка
}

export interface SkeletonProps extends BaseProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string;
  height?: string;
  count?: number;
}

export interface ModalProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg'; // default: 'md'
  children: ReactNode;
}

export interface LightboxProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  startIndex?: number;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps extends BaseProps {
  items: AccordionItem[];
  /** Разрешить несколько открытых панелей. default: false */
  multiple?: boolean;
  defaultOpenIds?: string[];
}

export interface EmptyStateProps extends BaseProps {
  title: string;
  description?: string;
  iconName?: IconName;
  action?: { label: string; href?: string; onClick?: () => void };
}

export interface ContainerProps extends BaseProps {
  /** 'default' = 1280px, 'narrow' = 720px, 'full' = без ограничения. */
  width?: 'default' | 'narrow' | 'full';
  as?: 'div' | 'section' | 'main' | 'footer' | 'header' | 'nav';
  children: ReactNode;
}

export interface SectionProps extends BaseProps {
  /** Фон секции — только из ролевых токенов. */
  background?: 'default' | 'subtle' | 'muted' | 'inverse';
  spacing?: 'none' | 'sm' | 'md' | 'lg'; // default: 'md'
  as?: 'section' | 'div';
  children: ReactNode;
}

export interface SectionHeadingProps extends BaseProps {
  /** Уровень заголовка. На странице h1 ровно один. default: 2 */
  level?: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  /** Мелкая надпись над заголовком. */
  eyebrow?: string;
  align?: 'left' | 'center'; // default: 'left'
  action?: { label: string; href: string };
}

/* ------------------------------------------------------------------ */
/* Layout (src/components/layout) — Агент 1                            */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
  /** Один уровень вложенности, глубже нельзя. */
  children?: NavLink[];
}

export interface HeaderProps extends BaseProps {
  nav: NavLink[];
  contacts: ContactInfoData;
  /** Прозрачная шапка поверх hero на главной. default: false */
  transparent?: boolean;
}

export interface FooterProps extends BaseProps {
  nav: NavLink[];
  contacts: ContactInfoData;
}

export interface BreadcrumbsProps extends BaseProps {
  items: BreadcrumbItem[];
}

export interface StickyCtaProps extends BaseProps {
  label?: string; // default: Оставить заявку
  onClick?: () => void;
  href?: string;
  /** Появляется после прокрутки на N px. default: 480 */
  showAfterScroll?: number;
}

export interface MessengerBadgesProps extends BaseProps {
  messengers: ContactInfoData['messengers'];
  size?: 'sm' | 'md'; // default: 'md'
}

/* ------------------------------------------------------------------ */
/* Формы (src/components/forms) — Агент 4                              */
/* ------------------------------------------------------------------ */

export interface RequestFormProps extends BaseProps {
  /**
   * full    — все поля + загрузка фото (страница Контакты, модалка)
   * compact — имя, телефон, услуга, согласие (секции, подвал)
   * inline  — телефон + согласие в одну строку (hero, sticky)
   */
  variant?: 'full' | 'compact' | 'inline'; // default: 'compact'
  /** Обязателен: попадает в уведомление и в цель аналитики. */
  source: LeadSource;
  defaultServiceType?: ServiceSlug;
  /** Показывать загрузку фото. default: variant === 'full' */
  showAttachments?: boolean;
  title?: string;
  description?: string;
  submitLabel?: string; // default: Отправить заявку
  /** Предзаполняет поле «Опишите задачу» — например, итогом калькулятора. */
  defaultMessage?: string;
  /** Вызывается после ответа 200. Форма сама показывает экран успеха. */
  onSuccess?: (data: LeadResponseData) => void;
  onError?: (error: ApiError) => void;
}

export interface ReviewFormProps extends BaseProps {
  defaultServiceCategory?: ServiceSlug;
  showAttachments?: boolean; // default: true
  title?: string;
  submitLabel?: string; // default: Отправить отзыв
  onSuccess?: (data: ReviewResponseData) => void;
  onError?: (error: ApiError) => void;
}

export interface CalculatorFormProps extends BaseProps {
  services: Service[];
  onEstimate?: (estimate: { min: number; max: number }) => void;
}

export interface ConsentCheckboxProps extends BaseProps {
  name?: string; // default: 'consent'
  checked?: boolean;
  error?: string;
  /** Блокируется на время отправки — как и остальные поля (контракт §6.5). */
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  policyHref?: string; // default: '/privacy'
}

export interface PhoneInputProps extends Omit<InputProps, 'type' | 'inputMode'> {
  /** Маска ввода. default: +7 (999) 999-99-99 */
  mask?: string;
}

export interface FileUploadProps extends BaseProps {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  maxFiles?: number; // default: 5
  /** Байты. default: 10 * 1024 * 1024 */
  maxFileSize?: number;
  /** default: image/jpeg, image/png, image/webp, image/heic */
  accept?: string[];
  onChange?: (attachmentIds: string[]) => void;
}

/* ------------------------------------------------------------------ */
/* Фичи (src/components/features) — Агент 3                            */
/* ------------------------------------------------------------------ */

export interface ServiceCardProps extends BaseProps {
  service: Service;
  /** grid — карточка в сетке, compact — строка в списке. */
  layout?: 'grid' | 'compact'; // default: 'grid'
  showCta?: boolean; // default: true
  onOrderClick?: (service: Service) => void;
}

export interface ServiceGridProps extends BaseProps {
  services: Service[];
  columns?: 2 | 3 | 4; // default: 3
  emptyMessage?: string;
}

export interface ServiceFilterProps extends BaseProps {
  categories: { value: ServiceSlug; label: string; count: number }[];
  value: ServiceSlug | 'all';
  onChange: (value: ServiceSlug | 'all') => void;
}

export interface PriceTableProps extends BaseProps {
  categories: PriceCategoryData[];
  /** Дисклеймер о примерных ценах (ТЗ п.5.3). default: true */
  showDisclaimer?: boolean;
  /** Открытая по умолчанию группа на мобильных (аккордеон). */
  defaultOpenGroup?: string;
}

export interface PortfolioGalleryProps extends BaseProps {
  items: PortfolioItem[];
  showFilters?: boolean; // default: true
  columns?: 2 | 3 | 4; // default: 3
  /** Сколько показать до кнопки Показать ещё. */
  initialCount?: number;
}

export interface PortfolioCardProps extends BaseProps {
  item: PortfolioItem;
  onOpen?: (item: PortfolioItem) => void;
}

export interface BeforeAfterSliderProps extends BaseProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  /** Стартовая позиция разделителя, 0..100. default: 50 */
  initialPosition?: number;
  /** Подписи под слайдером. default: До / После */
  labels?: { before: string; after: string };
}

export interface ReviewCardProps extends BaseProps {
  review: Review;
  /** Обрезать длинный текст кнопкой Читать полностью. default: true */
  truncate?: boolean;
}

export interface ReviewSliderProps extends BaseProps {
  reviews: Review[];
  autoplay?: boolean; // default: false
  /** Видимых карточек на десктопе. default: 3 */
  slidesPerView?: 1 | 2 | 3;
}

export interface MasterCardProps extends BaseProps {
  master: Master;
}

export interface ProcessStepsProps extends BaseProps {
  steps: ProcessStepData[];
  orientation?: 'horizontal' | 'vertical'; // default: 'horizontal'
}

export interface ContactInfoProps extends BaseProps {
  contacts: ContactInfoData;
  /** Бейдж Открыто/Закрыто. default: true */
  showStatus?: boolean;
  layout?: 'stacked' | 'inline'; // default: 'stacked'
}

export interface WorkStatusBadgeProps extends BaseProps {
  workingHours: ContactInfoData['workingHours'];
  timeZone: string;
}

export interface MapEmbedProps extends BaseProps {
  /** Координаты точки. Если не заданы — карта ищется по `query`. */
  coordinates?: [number, number];
  /** Адрес строкой: «Уфа, улица Ферина, 13/1». Используется без координат. */
  query?: string;
  zoom?: number; // default: 16
  markerTitle?: string;
  height?: string; // default: '400px'
}

/* ------------------------------------------------------------------ */
/* Секции главной (src/components/sections) — Агент 2                  */
/* ------------------------------------------------------------------ */

export interface HeroSectionProps extends BaseProps {
  title: string;
  subtitle: string;
  /** УТП-буллиты: срок от 1 дня, гарантия 30 дней. */
  highlights?: string[];
  image?: ImageAsset;
  primaryCta: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
}

export interface ServicesSectionProps extends BaseProps {
  services: Service[];
  heading?: string;
  /** Ссылка Все услуги. */
  moreHref?: string;
}

export interface AdvantagesSectionProps extends BaseProps {
  items: { id: string; title: string; description: string; iconName?: IconName }[];
  heading?: string;
}

export interface PortfolioSectionProps extends BaseProps {
  items: PortfolioItem[];
  heading?: string;
  moreHref?: string;
}

export interface ProcessSectionProps extends BaseProps {
  steps: ProcessStepData[];
  heading?: string;
}

export interface ReviewsSectionProps extends BaseProps {
  reviews: Review[];
  heading?: string;
  moreHref?: string;
  /** Средний балл для микроразметки AggregateRating. */
  averageRating?: number;
}

export interface PriceTeaserSectionProps extends BaseProps {
  categories: PriceCategoryData[];
  heading?: string;
  moreHref?: string;
}

export interface FaqSectionProps extends BaseProps {
  items: FaqItem[];
  heading?: string;
}

export interface MapSectionProps extends BaseProps {
  contacts: ContactInfoData;
  heading?: string;
}

export interface CtaSectionProps extends BaseProps {
  title: string;
  description?: string;
}
