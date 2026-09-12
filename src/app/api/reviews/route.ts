/**
 * POST /api/reviews — приём отзыва (публикуется после модерации).
 * Владелец файла: Агент 4. СТАТУС: рабочая заглушка.
 */

import { NextResponse } from 'next/server';

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
