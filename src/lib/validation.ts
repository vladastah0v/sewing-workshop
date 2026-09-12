/**
 * Валидация форм. Один и тот же модуль работает на клиенте и на сервере —
 * это гарантирует, что правила не разъедутся.
 * Владелец файла: Агент 4. Правки сигнатур — через контракт.
 * Зависимостей нет намеренно: подключить zod можно позже, не меняя API.
 */

import { FORM_LIMITS } from './constants';
import type { LeadRequest, ReviewRequest, ServiceSlug } from '@/types';

/** Ошибки по именам полей. Пустой объект = всё валидно. */
export type FieldErrors = Record<string, string>;

const SERVICE_SLUGS: ServiceSlug[] = [
  'repair',
  'tailoring',
  'custom-fit',
  'restoration',
  'other',
];

/** Оставляет только цифры: '+7 (999) 123-45-67' -> '79991234567'. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('8')) return `7${digits.slice(1)}`;
  return digits;
}

/** Приводит к E.164 или возвращает null, если номер невалиден. */
export function toE164(input: string): string | null {
  const digits = normalizePhone(input);
  return /^7\d{10}$/.test(digits) ? `+${digits}` : null;
}

export function validateName(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim().length < FORM_LIMITS.nameMin) {
    return 'Укажите имя — минимум 2 символа';
  }
  if (value.trim().length > FORM_LIMITS.nameMax) {
    return 'Имя слишком длинное';
  }
  return null;
}

export function validatePhone(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Укажите телефон для связи';
  }
  return toE164(value) ? null : 'Введите номер в формате +7 (999) 123-45-67';
}

export function validateConsent(value: unknown): string | null {
  return value === true ? null : 'Без согласия на обработку данных заявку не отправить';
}

export function validateServiceType(value: unknown): string | null {
  return SERVICE_SLUGS.includes(value as ServiceSlug) ? null : 'Выберите услугу';
}

/**
 * Антиспам без капчи (ТЗ п.5.5): honeypot + временная ловушка.
 * Возвращает true, если отправку следует отклонить.
 */
export function isSpam(payload: { hpField?: string; renderedAt?: number }): boolean {
  if (payload.hpField) return true;
  if (typeof payload.renderedAt !== 'number' || !Number.isFinite(payload.renderedAt)) {
    return true;
  }
  const elapsed = Date.now() - payload.renderedAt;
  // Слишком быстро — бот. Слишком давно (или метка из будущего) — подделанный
  // renderedAt в обход ловушки: живая вкладка столько не висит.
  return elapsed < FORM_LIMITS.minFillMs || elapsed > FORM_LIMITS.maxFillMs;
}

/** Полная проверка заявки. Используется формой и роутом /api/leads. */
export function validateLead(payload: Partial<LeadRequest>): FieldErrors {
  const errors: FieldErrors = {};
  const name = validateName(payload.name);
  if (name) errors.name = name;
  const phone = validatePhone(payload.phone);
  if (phone) errors.phone = phone;
  const service = validateServiceType(payload.serviceType);
  if (service) errors.serviceType = service;
  const consent = validateConsent(payload.consent);
  if (consent) errors.consent = consent;
  if (typeof payload.message === 'string' && payload.message.length > FORM_LIMITS.messageMax) {
    errors.message = `Не больше ${FORM_LIMITS.messageMax} символов`;
  }
  if (payload.attachmentIds && payload.attachmentIds.length > FORM_LIMITS.attachmentsMax) {
    errors.attachmentIds = `Не больше ${FORM_LIMITS.attachmentsMax} файлов`;
  }
  return errors;
}

/** Полная проверка отзыва. */
export function validateReview(payload: Partial<ReviewRequest>): FieldErrors {
  const errors: FieldErrors = {};
  const name = validateName(payload.authorName);
  if (name) errors.authorName = name;
  if (![1, 2, 3, 4, 5].includes(Number(payload.rating))) {
    errors.rating = 'Поставьте оценку';
  }
  const text = typeof payload.text === 'string' ? payload.text.trim() : '';
  if (text.length < FORM_LIMITS.reviewTextMin) {
    errors.text = `Напишите хотя бы ${FORM_LIMITS.reviewTextMin} символов`;
  } else if (text.length > FORM_LIMITS.reviewTextMax) {
    errors.text = `Не больше ${FORM_LIMITS.reviewTextMax} символов`;
  }
  const consent = validateConsent(payload.consent);
  if (consent) errors.consent = consent;
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
