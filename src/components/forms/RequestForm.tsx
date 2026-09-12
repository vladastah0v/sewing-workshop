'use client';

/**
 * RequestForm — заявка на ремонт/пошив. Три варианта вёрстки (контракт п.5.5).
 * Владелец: Агент 4. Контракт пропсов: RequestFormProps в src/types/ui.ts.
 *
 * Отправка — только через api-client, валидация — только через lib/validation,
 * цели — только из ANALYTICS_EVENTS. Прямой fetch в компонентах запрещён.
 */

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { Button, Card, Icon, Input, Select, Textarea } from '@/components/ui';
import { track } from '@/lib/analytics';
import { submitLead } from '@/lib/api-client';
import { ANALYTICS_EVENTS, FORM_LIMITS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  hasErrors,
  isSpam,
  toE164,
  validateConsent,
  validateLead,
  validateName,
  validatePhone,
  validateServiceType,
} from '@/lib/validation';
import type { FieldErrors } from '@/lib/validation';
import type {
  LeadRequest,
  LeadResponseData,
  PreferredChannel,
  PreferredContactTime,
  RequestFormProps,
  ServiceSlug,
} from '@/types';
import { ConsentCheckbox } from './ConsentCheckbox';
import { FileUpload } from './FileUpload';
import { PhoneInput } from './PhoneInput';
import { CHANNEL_OPTIONS, SERVICE_OPTIONS, TIME_OPTIONS, focusFirstError } from './formUtils';

const SPAM_MESSAGE = 'Не удалось отправить заявку';

interface FormValues {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  preferredTime: string;
  preferredChannel: string;
  consent: boolean;
  attachmentIds: string[];
  hpField: string;
}

export function RequestForm({
  variant = 'compact',
  source,
  defaultServiceType,
  showAttachments,
  title,
  description,
  submitLabel = 'Отправить заявку',
  defaultMessage,
  onSuccess,
  onError,
  className,
  id,
}: RequestFormProps) {
  const isInline = variant === 'inline';
  const isFull = variant === 'full';
  const withAttachments = showAttachments ?? isFull;

  const initialValues: FormValues = {
    name: '',
    phone: '',
    serviceType: defaultServiceType ?? '',
    message: defaultMessage ?? '',
    preferredTime: '',
    preferredChannel: '',
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
  const [success, setSuccess] = useState<LeadResponseData | null>(null);

  // Метку времени ставим на монтировании, уже на клиенте: посчитанная
  // на сервере, она разъедется при гидратации и даст ложное срабатывание.
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

  function buildDraft(): Partial<LeadRequest> {
    return {
      // В варианте inline поля имени нет — не отправляем его вовсе.
      // Владелец увидит в уведомлении «не указано», а не выдуманное имя.
      ...(isInline || !values.name.trim() ? {} : { name: values.name.trim() }),
      phone: toE164(values.phone) ?? values.phone.trim(),
      serviceType: values.serviceType as ServiceSlug,
      ...(values.message.trim() ? { message: values.message.trim() } : {}),
      ...(values.preferredTime
        ? { preferredTime: values.preferredTime as PreferredContactTime }
        : {}),
      ...(values.preferredChannel
        ? { preferredChannel: values.preferredChannel as PreferredChannel }
        : {}),
      ...(values.consent ? { consent: true as const } : {}),
      source,
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

    const fieldErrors = validateLead(draft);
    if (hasErrors(fieldErrors)) {
      setErrors(fieldErrors);
      setFormError('Проверьте заполнение полей');
      focusFirstError(formRef.current, fieldErrors);
      return;
    }

    // Та же проверка, что и на сервере (контракт п.6.4): бота отсекаем
    // до запроса, ответ нейтральный — механику защиты не подсказываем.
    if (isSpam(draft)) {
      setErrors({});
      setFormError(SPAM_MESSAGE);
      return;
    }

    setErrors({});
    track(ANALYTICS_EVENTS.leadSubmit, { source, variant });
    setSubmitting(true);

    const response = await submitLead(draft as LeadRequest);
    setSubmitting(false);

    if (response.ok) {
      track(ANALYTICS_EVENTS.leadSuccess, { source, variant });
      setSuccess(response.data);
      onSuccess?.(response.data);
      return;
    }

    track(ANALYTICS_EVENTS.leadError, { source, variant, code: response.error.code });
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
          <p className="font-heading text-2xl">Заявка принята</p>
          <p className="text-text-muted">{success.message}</p>
        </div>
        <Button variant="secondary" onClick={reset}>
          Отправить ещё одну
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
      {(title || description) && (
        <div className="flex flex-col gap-2">
          {title && <h2 className="font-heading text-2xl">{title}</h2>}
          {description && <p className="text-text-muted">{description}</p>}
        </div>
      )}

      {isInline ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <PhoneInput
            name="phone"
            label="Телефон"
            required
            disabled={submitting}
            className="sm:flex-1"
            value={values.phone}
            error={errors.phone}
            onChange={(value) => set('phone', value)}
            onBlur={() => setFieldError('phone', validatePhone(values.phone))}
          />
          {/* mt-8 выравнивает кнопку по нижнему краю поля: над полем стоит label */}
          <Button type="submit" loading={submitting} className="sm:mt-8">
            {submitLabel}
          </Button>
        </div>
      ) : (
        <div className={cn('grid gap-5', isFull && 'md:grid-cols-2')}>
          <Input
            name="name"
            label="Имя"
            required
            disabled={submitting}
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={values.name}
            error={errors.name}
            onChange={(value) => set('name', value)}
            onBlur={() => setFieldError('name', validateName(values.name))}
          />
          <PhoneInput
            name="phone"
            label="Телефон"
            required
            disabled={submitting}
            value={values.phone}
            error={errors.phone}
            onChange={(value) => set('phone', value)}
            onBlur={() => setFieldError('phone', validatePhone(values.phone))}
          />
          <Select
            name="serviceType"
            label="Услуга"
            required
            disabled={submitting}
            placeholder="Выберите услугу"
            options={SERVICE_OPTIONS}
            value={values.serviceType}
            error={errors.serviceType}
            onChange={(value) => {
              set('serviceType', value);
              setFieldError('serviceType', validateServiceType(value));
            }}
            className={cn(isFull && 'md:col-span-2')}
          />

          {isFull && (
            <>
              <Select
                name="preferredTime"
                label="Удобное время для связи"
                disabled={submitting}
                placeholder="Не важно"
                options={TIME_OPTIONS}
                value={values.preferredTime}
                onChange={(value) => set('preferredTime', value)}
              />
              <Select
                name="preferredChannel"
                label="Как связаться"
                disabled={submitting}
                placeholder="Не важно"
                options={CHANNEL_OPTIONS}
                value={values.preferredChannel}
                onChange={(value) => set('preferredChannel', value)}
              />
              <Textarea
                name="message"
                label="Что нужно сделать"
                hint={`Опишите изделие и задачу — до ${FORM_LIMITS.messageMax} символов`}
                maxLength={FORM_LIMITS.messageMax}
                disabled={submitting}
                placeholder="Например: заменить молнию на кожаной куртке"
                value={values.message}
                error={errors.message}
                onChange={(value) => set('message', value)}
                className="md:col-span-2"
              />
            </>
          )}

          {withAttachments && (
            <FileUpload
              name="attachments"
              label="Фото изделия"
              error={errors.attachmentIds}
              onChange={(attachmentIds) => set('attachmentIds', attachmentIds)}
              className={cn(isFull && 'md:col-span-2')}
            />
          )}
        </div>
      )}

      <ConsentCheckbox
        checked={values.consent}
        disabled={submitting}
        error={errors.consent}
        onChange={(checked) => {
          set('consent', checked);
          setFieldError('consent', validateConsent(checked));
        }}
      />

      {/* Honeypot: человек это поле не видит и не заполняет (контракт п.6.4) */}
      <div className="visually-hidden" aria-hidden>
        <label htmlFor={`${source}-hp`}>Не заполняйте это поле</label>
        <input
          id={`${source}-hp`}
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

      {!isInline && (
        <Button
          type="submit"
          loading={submitting}
          fullWidth={!isFull}
          className={cn(isFull && 'sm:self-start')}
        >
          {submitLabel}
        </Button>
      )}
    </form>
  );
}
