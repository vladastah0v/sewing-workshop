/**
 * Отправка уведомлений владельцу о новой заявке.
 * СТАТУС: заглушка. Реализует Агент 4 (Telegram Bot API sendMessage).
 * Сигнатуру менять нельзя — на неё завязаны роуты.
 */

import type { LeadRequest, ReviewRequest } from '@/types';

export interface NotifyResult {
  delivered: boolean;
  /** Причина недоставки — только для логов, пользователю не показываем. */
  reason?: string;
}

export async function notifyNewLead(
  lead: LeadRequest & { leadId: string },
): Promise<NotifyResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Заглушка: без токена просто пишем в лог, форма при этом работает.
    console.info('[notify] заявка без доставки в Telegram', lead.leadId);
    return { delivered: false, reason: 'TELEGRAM_NOT_CONFIGURED' };
  }

  // TODO(Агент 4): POST https://api.telegram.org/bot<token>/sendMessage
  return { delivered: false, reason: 'NOT_IMPLEMENTED' };
}

export async function notifyNewReview(
  review: ReviewRequest & { reviewId: string },
): Promise<NotifyResult> {
  console.info('[notify] отзыв ожидает модерации', review.reviewId);
  return { delivered: false, reason: 'NOT_IMPLEMENTED' };
}
