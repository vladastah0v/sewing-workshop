/**
 * POST /api/leads — приём заявки.
 * Владелец файла: Агент 4. Контракт запроса/ответа: src/types/api.ts.
 * Валидация, антиспам (honeypot + таймтрап + лимит по IP) и доставка
 * уведомления в Telegram — рабочие.
 */

import { NextResponse } from 'next/server';

import { checkRateLimit, clientIp } from '@/lib/rate-limit';
import { notifyNewLead } from '@/lib/notify';
import { hasErrors, isSpam, toE164, validateLead } from '@/lib/validation';
import type { LeadRequest, LeadResponse } from '@/types';

export async function POST(request: Request): Promise<NextResponse<LeadResponse>> {
  let payload: Partial<LeadRequest>;

  try {
    payload = (await request.json()) as Partial<LeadRequest>;
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: 'VALIDATION_ERROR', message: 'Некорректный запрос' } },
      { status: 400 },
    );
  }

  // Третий уровень антиспама (контракт п.6.4): не больше 5 отправок с IP за 10 минут.
  const limit = checkRateLimit(`leads:${clientIp(request)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'RATE_LIMITED', message: 'Слишком много заявок подряд. Попробуйте через несколько минут.' },
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    );
  }

  if (isSpam(payload)) {
    // Боту отвечаем нейтрально, чтобы не подсказывать механику защиты.
    return NextResponse.json(
      { ok: false, error: { code: 'SPAM_DETECTED', message: 'Не удалось отправить заявку' } },
      { status: 400 },
    );
  }

  const fields = validateLead(payload);
  if (hasErrors(fields)) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'Проверьте заполнение полей', fields },
      },
      { status: 422 },
    );
  }

  const lead = {
    ...(payload as LeadRequest),
    phone: toE164(payload.phone as string) as string,
    leadId: crypto.randomUUID(),
  };

  await notifyNewLead(lead);

  return NextResponse.json({
    ok: true,
    data: {
      leadId: lead.leadId,
      message: 'Заявка принята. Перезвоним в течение 15 минут в рабочее время.',
    },
  });
}
