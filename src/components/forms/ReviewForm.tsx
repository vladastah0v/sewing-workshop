'use client';

/**
 * ReviewForm — отзыв клиента. Публикуется только после модерации (ТЗ п.5.7).
 * Владелец: Агент 4. Контракт пропсов: ReviewFormProps в src/types/ui.ts.
 * Отправка — через api-client, валидация — через lib/validation.
 */

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { Button, Card, Icon, Input, Rating, Select, Textarea } from '@/components/ui';
import { track } from '@/lib/analytics';
import { submitReview } from '@/lib/api-client';
import { ANALYTICS_EVENTS, FORM_LIMITS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { hasErrors, isSpam, validateConsent, validateName, validateReview } from '@/lib/validation';
import type { FieldErrors } from '@/lib/validation';
import type { ReviewFormProps, ReviewRequest, ReviewResponseData, ServiceSlug } from '@/types';
import { ConsentCheckbox } from './ConsentCheckbox';
import { FileUpload } from './FileUpload';
import { SERVICE_OPTIONS, focusFirstError } from './formUtils';

const SPAM_MESSAGE = 'Не удалось отправить отзыв';

type Stars = 1 | 2 | 3 | 4 | 5;

interface FormValues {
  authorName: string;
  rating: number;
  text: string;
  serviceCategory: string;
  contact: string;
  consent: boolean;
  attachmentIds: string[];
  hpField: string;
}

export function ReviewForm({
  defaultServiceCategory,
  showAttachments = true,
  title,
  submitLabel = 'Отправить отзыв',
  onSuccess,
  onError,
  className,
  id,
}: ReviewFormProps) {
  const initialValues: FormValues = {
    authorName: '',
    rating: 0,
    text: '',
    serviceCategory: defaultServiceCategory ?? '',
    contact: '',
    consent: false,
    attachmentIds: [],
    hpField: '',
  };

  const formRef = useRef<HTMLFormElement>(null);
  const renderedAt = useRef(0);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<ReviewResponseData | null>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function setFieldError(field: string, message: string | null) {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function buildDraft(): Partial<ReviewRequest> {
    return {
      authorName: values.authorName.trim(),
      ...(values.rating > 0 ? { rating: values.rating as Stars } : {}),
      text: values.text.trim(),
      ...(values.serviceCategory
        ? { serviceCategory: values.serviceCategory as ServiceSlug }
        : {}),
      ...(values.contact.trim() ? { contact: values.contact.trim() } : {}),
      ...(values.consent ? { consent: true as const } : {}),
      ...(values.attachmentIds.length ? { attachmentIds: values.attachmentIds } : {}),
      hpField: values.hpField,
      renderedAt: renderedAt.current,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);
    const draft = buildDraft();

    const fieldErrors = validateReview(draft);
    if (hasErrors(fieldErrors)) {
      setErrors(fieldErrors);
      setFormError('Проверьте заполнение полей');
      focusFirstError(formRef.current, fieldErrors);
      return;
    }

    if (isSpam(draft)) {
      setErrors({});
      setFormError(SPAM_MESSAGE);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const response = await submitReview(draft as ReviewRequest);
    setSubmitting(false);

    if (response.ok) {
      // Цель считает дошедшие до модерации отзывы, поэтому шлём её на успехе.
      track(ANALYTICS_EVENTS.reviewSubmit, { rating: values.rating });
      setSuccess(response.data);
      onSuccess?.(response.data);
      return;
    }

    setErrors(response.error.fields ?? {});
    setFormError(response.error.message);
    if (response.error.fields) focusFirstError(formRef.current, response.error.fields);
    onError?.(response.error);
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setFormError(null);
    setSuccess(null);
    renderedAt.current = Date.now();
  }

  if (success) {
    return (
      <Card id={id} className={cn('flex flex-col items-center gap-4 text-center', className)}>
        <span className="grid size-14 place-items-center rounded-full bg-accent-subtle text-accent">
          <Icon name="check" size={28} />
        </span>
        <div role="status" className="flex flex-col gap-2">
          <p className="font-heading text-2xl">Спасибо за отзыв</p>
          <p className="text-text-muted">{success.message}</p>
        </div>
        <Button variant="secondary" onClick={reset}>
          Написать ещё один
        </Button>
      </Card>
    );
  }

  return (
    <form
      id={id}
      ref={formRef}
      tabIndex={-1}
      noValidate
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-5', className)}
    >
      {title && <h2 className="font-heading text-2xl">{title}</h2>}

      {/* Rating — не поле формы, name у него нет: помечаем data-field для фокуса */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text">
          Оценка
          <span aria-hidden className="ml-1 text-error">
            *
          </span>
        </span>
        <div data-field="rating" tabIndex={-1} className="w-fit">
          <Rating
            value={values.rating}
            size="lg"
            onChange={(rating) => {
              set('rating', rating);
              setFieldError('rating', null);
            }}
          />
        </div>
        {errors.rating && (
          <p role="alert" className="text-sm text-error">
            {errors.rating}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          name="authorName"
          label="Как вас зовут"
          required
          disabled={submitting}
          autoComplete="name"
          placeholder="Имя или имя и фамилия"
          value={values.authorName}
          error={errors.authorName}
          onChange={(value) => set('authorName', value)}
          onBlur={() => setFieldError('authorName', validateName(values.authorName))}
        />
        <Select
          name="serviceCategory"
          label="Услуга"
          disabled={submitting}
          placeholder="Не указывать"
          options={SERVICE_OPTIONS}
          value={values.serviceCategory}
          onChange={(value) => set('serviceCategory', value)}
        />
        <Textarea
          name="text"
          label="Отзыв"
          required
          disabled={submitting}
          rows={5}
          maxLength={FORM_LIMITS.reviewTextMax}
          hint={`От ${FORM_LIMITS.reviewTextMin} до ${FORM_LIMITS.reviewTextMax} символов`}
          placeholder="Что заказывали, как прошла работа, что понравилось"
          value={values.text}
          error={errors.text}
          onChange={(value) => set('text', value)}
          className="md:col-span-2"
        />
        <Input
          name="contact"
          label="Телефон или почта"
          hint="Нужны только для связи по отзыву, на сайте не публикуются"
          disabled={submitting}
          value={values.contact}
          error={errors.contact}
          onChange={(value) => set('contact', value)}
          className="md:col-span-2"
        />

        {showAttachments && (
          <FileUpload
            name="attachments"
            label="Фото работы"
            error={errors.attachmentIds}
            onChange={(attachmentIds) => set('attachmentIds', attachmentIds)}
            className="md:col-span-2"
          />
        )}
      </div>

      <ConsentCheckbox
        checked={values.consent}
        error={errors.consent}
        onChange={(checked) => {
          set('consent', checked);
          setFieldError('consent', validateConsent(checked));
        }}
      />

      <div className="visually-hidden" aria-hidden>
        <label htmlFor="review-hp">Не заполняйте это поле</label>
        <input
          id="review-hp"
          name="hpField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.hpField}
          onChange={(event) => set('hpField', event.target.value)}
        />
      </div>

      {formError && (
        <p role="alert" className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          {formError}
        </p>
      )}

      <Button type="submit" loading={submitting} className="sm:self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
