/**
 * Отправка уведомлений владельцу о новой заявке и о новом отзыве.
 * Владелец файла: Агент 4. Сигнатуры менять нельзя — на них завязаны роуты.
 *
 * Канал доставки — Telegram Bot API, метод sendMessage. Без переменных
 * TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID уведомление уходит в лог, а форма
 * продолжает работать: заявку нельзя терять из-за упавшей интеграции.
 */

import { SERVICE_LABELS } from './constants';
import { formatPhone } from './utils';
import type {
  LeadRequest,
  LeadSource,
  PreferredChannel,
  PreferredContactTime,
  ReviewRequest,
} from '@/types';

export interface NotifyResult {
  delivered: boolean;
  /** Причина недоставки — только для логов, пользователю не показываем. */
  reason?: string;
}

const TELEGRAM_TIMEOUT_MS = 7000;

const SOURCE_LABELS: Record<LeadSource, string> = {
  hero: 'первый экран',
  'services-section': 'блок услуг',
  'service-page': 'страница услуги',
  'price-page': 'страница цен',
  portfolio: 'портфолио',
  footer: 'подвал',
  contacts: 'страница контактов',
  popup: 'всплывающее окно',
  'sticky-cta': 'липкая кнопка',
  calculator: 'калькулятор',
};

const TIME_LABELS: Record<PreferredContactTime, string> = {
  any: 'в любое время',
  morning: 'утром, 9:00–12:00',
  afternoon: 'днём, 12:00–17:00',
  evening: 'вечером, 17:00–21:00',
};

const CHANNEL_LABELS: Record<PreferredChannel, string> = {
  phone: 'звонок',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
};

/** Экранирование под parse_mode=HTML: Telegram требует только эти три символа. */
function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function line(label: string, value: string): string {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`;
}

/**
 * Единственное место, где проект ходит в Telegram.
 * Ошибки не бросаем: уведомление не должно ломать ответ формы.
 */
async function sendTelegram(text: string): Promise<NotifyResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { delivered: false, reason: 'TELEGRAM_NOT_CONFIGURED' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
      cache: 'no-store',
    });

    if (!response.ok) {
      // Тело ответа Telegram содержит описание ошибки, но не токен —
      // сам токен в логи не попадает никогда.
      const detail = await response.text().catch(() => '');
      return { delivered: false, reason: `TELEGRAM_HTTP_${response.status} ${detail.slice(0, 200)}`.trim() };
    }

    const json = (await response.json()) as { ok?: boolean; description?: string };
    if (json.ok) return { delivered: true };

    return { delivered: false, reason: `TELEGRAM_API ${json.description ?? 'unknown'}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    return { delivered: false, reason: `TELEGRAM_NETWORK ${message}` };
  }
}

function report(kind: string, entityId: string, result: NotifyResult): NotifyResult {
  if (!result.delivered) {
    console.warn(`[notify] ${kind} ${entityId} не доставлен: ${result.reason ?? 'unknown'}`);
  }
  return result;
}

export async function notifyNewLead(
  lead: LeadRequest & { leadId: string },
): Promise<NotifyResult> {
  const rows = [
    '<b>Новая заявка с сайта</b>',
    '',
    line('Имя', lead.name),
    line('Телефон', formatPhone(lead.phone)),
    line('Услуга', SERVICE_LABELS[lead.serviceType] ?? lead.serviceType),
  ];

  if (lead.message) rows.push(line('Задача', lead.message));
  if (lead.preferredTime) rows.push(line('Удобное время', TIME_LABELS[lead.preferredTime]));
  if (lead.preferredChannel) rows.push(line('Связь', CHANNEL_LABELS[lead.preferredChannel]));
  if (lead.attachmentIds?.length) rows.push(line('Фото', `${lead.attachmentIds.length} шт.`));

  rows.push(line('Откуда', SOURCE_LABELS[lead.source] ?? lead.source));
  rows.push(line('Номер заявки', lead.leadId));

  return report('заявка', lead.leadId, await sendTelegram(rows.join('\n')));
}

export async function notifyNewReview(
  review: ReviewRequest & { reviewId: string },
): Promise<NotifyResult> {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  const rows = [
    '<b>Новый отзыв — ждёт модерации</b>',
    '',
    line('Автор', review.authorName),
    line('Оценка', `${stars} (${review.rating} из 5)`),
    line('Текст', review.text),
  ];

  if (review.serviceCategory) {
    rows.push(line('Услуга', SERVICE_LABELS[review.serviceCategory] ?? review.serviceCategory));
  }
  if (review.contact) rows.push(line('Контакт', review.contact));
  if (review.attachmentIds?.length) rows.push(line('Фото', `${review.attachmentIds.length} шт.`));

  rows.push(line('Номер отзыва', review.reviewId));

  return report('отзыв', review.reviewId, await sendTelegram(rows.join('\n')));
}
