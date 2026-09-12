/**
 * POST /api/reviews — приём отзыва (публикуется после модерации).
 * Владелец файла: Агент 4. Отзыв проверяется, логируется и уходит
 * владельцу в Telegram; публикация — вручную после модерации.
 */

import { NextResponse } from 'next/server';

import { checkRateLimit, clientIp } from '@/lib/rate-limit';
import { notifyNewReview } from '@/lib/notify';
import { hasErrors, isSpam, validateReview } from '@/lib/validation';
import type { ReviewRequest, ReviewResponse } from '@/types';

export async function POST(request: Request): Promise<NextResponse<ReviewResponse>> {
  let payload: Partial<ReviewRequest>;

  try {
    payload = (await request.json()) as Partial<ReviewRequest>;
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: 'VALIDATION_ERROR', message: 'Некорректный запрос' } },
      { status: 400 },
    );
  }

  // Третий уровень антиспама (контракт п.6.4): не больше 5 отправок с IP за 10 минут.
  const limit = checkRateLimit(`reviews:${clientIp(request)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'RATE_LIMITED', message: 'Слишком много отзывов подряд. Попробуйте через несколько минут.' },
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    );
  }

  if (isSpam(payload)) {
    return NextResponse.json(
      { ok: false, error: { code: 'SPAM_DETECTED', message: 'Не удалось отправить отзыв' } },
      { status: 400 },
    );
  }

  const fields = validateReview(payload);
  if (hasErrors(fields)) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'Проверьте заполнение полей', fields },
      },
      { status: 422 },
    );
  }

  const review = { ...(payload as ReviewRequest), reviewId: crypto.randomUUID() };
  await notifyNewReview(review);

  return NextResponse.json({
    ok: true,
    data: {
      reviewId: review.reviewId,
      status: 'pending',
      message: 'Спасибо! Отзыв появится на сайте после проверки модератором.',
    },
  });
}
