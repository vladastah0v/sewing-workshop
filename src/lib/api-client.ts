/**
 * Тонкий клиент к собственным API-роутам.
 * Формы вызывают ТОЛЬКО эти функции — прямой fetch в компонентах запрещён,
 * иначе обработка ошибок разъедется между агентами.
 * Владелец файла: Агент 4.
 */

import { API_ROUTES } from './constants';
import type {
  ApiError,
  ApiResponse,
  LeadRequest,
  LeadResponseData,
  ReviewRequest,
  ReviewResponseData,
  UploadResponseData,
} from '@/types';

const NETWORK_ERROR: ApiError = {
  code: 'INTERNAL_ERROR',
  message: 'Не удалось отправить. Проверьте связь и попробуйте ещё раз.',
};

async function postJson<TReq, TRes>(
  url: string,
  body: TReq,
): Promise<ApiResponse<TRes>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = (await response.json()) as ApiResponse<TRes>;
    return json;
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

export function submitLead(payload: LeadRequest) {
  return postJson<LeadRequest, LeadResponseData>(API_ROUTES.leads, payload);
}

export function submitReview(payload: ReviewRequest) {
  return postJson<ReviewRequest, ReviewResponseData>(API_ROUTES.reviews, payload);
}

export async function uploadAttachment(
  file: File,
): Promise<ApiResponse<UploadResponseData>> {
  try {
    const form = new FormData();
    form.append('file', file);
    const response = await fetch(API_ROUTES.uploads, { method: 'POST', body: form });
    return (await response.json()) as ApiResponse<UploadResponseData>;
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}
