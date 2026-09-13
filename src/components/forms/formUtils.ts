'use client';

/**
 * Общие мелочи для форм. Владелец: Агент 4.
 * Здесь нет компонентов — только справочники опций и помощник фокуса,
 * чтобы RequestForm и ReviewForm не дублировали одно и то же.
 */

import { SERVICE_LABELS } from '@/lib/constants';
import type { FieldErrors } from '@/lib/validation';
import type { SelectOption, ServiceSlug } from '@/types';

/** Услуги для <Select>. Источник названий один — SERVICE_LABELS. */
export const SERVICE_OPTIONS: SelectOption[] = (
  Object.keys(SERVICE_LABELS) as ServiceSlug[]
).map((slug) => ({ value: slug, label: SERVICE_LABELS[slug] }));

/** Удобное время связи (LeadRequest.preferredTime). */
export const TIME_OPTIONS: SelectOption[] = [
  { value: 'any', label: 'В любое время' },
  { value: 'morning', label: 'Утром, 9:00–12:00' },
  { value: 'afternoon', label: 'Днём, 12:00–17:00' },
  { value: 'evening', label: 'Вечером, 17:00–21:00' },
];

/** Канал связи (LeadRequest.preferredChannel). */
export const CHANNEL_OPTIONS: SelectOption[] = [
  { value: 'phone', label: 'Позвонить' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
];

/**
 * Фокус на первое поле с ошибкой (контракт п.6.5).
 * Ищем по name; контролы без name (например, звёзды Rating) помечены data-field.
 */
export function focusFirstError(form: HTMLFormElement | null, errors: FieldErrors): void {
  if (!form) return;

  for (const field of Object.keys(errors)) {
    const control = form.querySelector<HTMLElement>(
      `[name="${field}"], [data-field="${field}"]`,
    );
    if (control) {
      control.focus();
      return;
    }
  }

  // Поля может не быть в текущем варианте формы — уводим фокус хотя бы на форму,
  // иначе скринридер не заметит появившееся сообщение об ошибке.
  form.focus();
}

/** 2411724 -> «2,3 МБ». Нужно только формам, в общие utils не выносим. */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} МБ`;
}
