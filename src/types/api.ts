/**
 * API-контракт. Фиксирован до написания бэкенда:
 * Агент 4 реализует роуты, остальные агенты уже могут дёргать эти типы.
 * Владелец файла: Агент 1 (по согласованию с Агентом 4).
 */

import type { ServiceSlug } from './content';

/* ------------------------------------------------------------------ */
/* Общая обёртка ответов                                               */
/* ------------------------------------------------------------------ */

export type ApiErrorCode =
  | 'VALIDATION_ERROR'   // 422 — поля не прошли валидацию
  | 'SPAM_DETECTED'      // 400 — honeypot/таймтрап сработали
  | 'RATE_LIMITED'       // 429 — превышен лимит отправок
  | 'PAYLOAD_TOO_LARGE'  // 413 — файл больше лимита
  | 'UNSUPPORTED_MEDIA'  // 415 — неподдерживаемый тип файла
  | 'INTERNAL_ERROR';    // 500 — всё остальное

export interface ApiError {
  code: ApiErrorCode;
  /** Человекочитаемое сообщение на русском — можно показывать пользователю. */
  message: string;
  /** Ошибки по полям: { phone: 'Введите номер в формате +7…' } */
  fields?: Record<string, string>;
}

export type ApiResponse<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: ApiError };

/* ------------------------------------------------------------------ */
/* POST /api/leads — заявка                                            */
/* ------------------------------------------------------------------ */

/** Откуда пришла заявка — прокидывается в аналитику и уведомление. */
export type LeadSource =
  | 'hero'
  | 'services-section'
  | 'service-page'
  | 'price-page'
  | 'portfolio'
  | 'footer'
  | 'contacts'
  | 'popup'
  | 'sticky-cta'
  | 'calculator'
  | 'about'
  | 'process';

export type PreferredContactTime = 'any' | 'morning' | 'afternoon' | 'evening';
export type PreferredChannel = 'phone' | 'whatsapp' | 'telegram';

export interface LeadRequest {
  /**
   * 2–80 символов. Необязательно: вариант формы `inline` (hero, sticky)
   * спрашивает только телефон. Подставлять имя-заглушку запрещено —
   * владелец должен видеть, что клиент его не оставлял.
   */
  name?: string;
  /** Только цифры в формате E.164, РФ: +7XXXXXXXXXX. Маску снимает клиент. */
  phone: string;
  serviceType: ServiceSlug;
  /** 0–1000 символов. */
  message?: string;
  preferredTime?: PreferredContactTime;
  preferredChannel?: PreferredChannel;
  /** Согласие на обработку ПДн (152-ФЗ). Только literal true. */
  consent: true;
  source: LeadSource;
  /** id файлов, полученные из POST /api/uploads. Максимум 5. */
  attachmentIds?: string[];
  /** Honeypot: скрытое поле, у человека всегда пустая строка. */
  hpField: string;
  /** Date.now() в момент монтирования формы. Отправка быстрее 3000 мс = спам. */
  renderedAt: number;
}

export interface LeadResponseData {
  leadId: string;
  /** Что показать пользователю после успеха. */
  message: string;
}

export type LeadResponse = ApiResponse<LeadResponseData>;

/* ------------------------------------------------------------------ */
/* POST /api/reviews — отзыв (уходит на модерацию)                     */
/* ------------------------------------------------------------------ */

export interface ReviewRequest {
  authorName: string;              // 2–60
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;                    // 10–1500
  serviceCategory?: ServiceSlug;
  /** Необязательный контакт для обратной связи по отзыву. */
  contact?: string;
  attachmentIds?: string[];
  consent: true;
  hpField: string;
  renderedAt: number;
}

export interface ReviewResponseData {
  reviewId: string;
  /** Всегда 'pending': отзыв публикуется только после модерации. */
  status: 'pending';
  message: string;
}

export type ReviewResponse = ApiResponse<ReviewResponseData>;

/* ------------------------------------------------------------------ */
/* POST /api/uploads — загрузка фото к заявке (multipart/form-data)    */
/* ------------------------------------------------------------------ */

export interface UploadResponseData {
  attachmentId: string;
  fileName: string;
  /** Байты. */
  size: number;
  mimeType: string;
  /** Временный URL превью, живёт до отправки заявки. */
  previewUrl?: string;
}

export type UploadResponse = ApiResponse<UploadResponseData>;
