'use client';

/**
 * CalculatorForm — предварительный расчёт стоимости (ТЗ п.5.5).
 * Владелец: Агент 4. Контракт пропсов: CalculatorFormProps в src/types/ui.ts.
 *
 * Считает на клиенте, без запросов: цена «от» из услуги × коэффициенты.
 * Коэффициенты временные — реальные множители запрошены у заказчика
 * (см. docs/requests-forms.md, открытый вопрос п.3 контракта).
 * Формы заявки на сайте нет (решение заказчика от 13.09.2026): под расчётом
 * стоит блок с телефоном.
 */

import { useEffect, useMemo, useRef, useState } from 'react';

import { Button, Card, EmptyState, Input, MessengerBadges, Select } from '@/components/ui';
import { CONTACTS } from '@/content/contacts';
import { cn, formatLeadTime, formatPrice } from '@/lib/utils';
import type { CalculatorFormProps, SelectOption, Service } from '@/types';

/** Сложность работы. factor — множитель к цене «от». */
const COMPLEXITY: { value: string; label: string; factor: number }[] = [
  { value: 'simple', label: 'Простая — подшить, заменить фурнитуру', factor: 1 },
  { value: 'standard', label: 'Обычная — подгонка по фигуре', factor: 1.3 },
  { value: 'complex', label: 'Сложная — кожа, мех, свадебное', factor: 1.8 },
];

/** Срочность. Ускорение работы считается отдельным множителем. */
const URGENCY: { value: string; label: string; factor: number }[] = [
  { value: 'standard', label: 'Обычный срок', factor: 1 },
  { value: 'urgent', label: 'Срочно', factor: 1.5 },
];

/** Верхняя граница вилки относительно нижней. */
const RANGE_FACTOR = 1.6;
const MAX_QUANTITY = 10;

const toOptions = (list: { value: string; label: string }[]): SelectOption[] =>
  list.map(({ value, label }) => ({ value, label }));

const roundTo50 = (value: number) => Math.round(value / 50) * 50;

export function CalculatorForm({
  services,
  onEstimate,
  className,
  id,
}: CalculatorFormProps) {
  const [serviceId, setServiceId] = useState(services[0]?.id ?? '');
  const [complexity, setComplexity] = useState(COMPLEXITY[1]?.value ?? 'standard');
  const [urgency, setUrgency] = useState(URGENCY[0]?.value ?? 'standard');
  const [quantity, setQuantity] = useState('1');

  const service: Service | undefined = services.find((item) => item.id === serviceId);

  const estimate = useMemo(() => {
    if (!service || service.priceFrom === null) return null;

    const count = Math.min(Math.max(Number.parseInt(quantity, 10) || 1, 1), MAX_QUANTITY);
    const complexityFactor = COMPLEXITY.find((item) => item.value === complexity)?.factor ?? 1;
    const urgencyFactor = URGENCY.find((item) => item.value === urgency)?.factor ?? 1;

    const min = roundTo50(service.priceFrom * count * complexityFactor * urgencyFactor);
    return { min, max: roundTo50(min * RANGE_FACTOR) };
  }, [service, quantity, complexity, urgency]);

  // Колбэк держим в ref: родитель почти всегда передаёт стрелку,
  // в зависимостях эффекта она давала бы лишние вызовы на каждый рендер.
  const onEstimateRef = useRef(onEstimate);
  useEffect(() => {
    onEstimateRef.current = onEstimate;
  });
  useEffect(() => {
    if (estimate) onEstimateRef.current?.(estimate);
  }, [estimate]);

  if (services.length === 0) {
    return (
      <EmptyState
        id={id}
        className={className}
        iconName="info"
        title="Список услуг пока пуст"
        description="Расчёт появится, как только услуги будут добавлены. Пока уточните цену по телефону."
      />
    );
  }

  const serviceOptions: SelectOption[] = services.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <div id={id} className={cn('flex flex-col gap-6', className)}>
      <div className="grid gap-5 md:grid-cols-2">
        <Select
          name="calcService"
          label="Что нужно сделать"
          options={serviceOptions}
          value={serviceId}
          onChange={setServiceId}
          className="md:col-span-2"
        />
        <Select
          name="calcComplexity"
          label="Сложность работы"
          options={toOptions(COMPLEXITY)}
          value={complexity}
          onChange={setComplexity}
        />
        <Select
          name="calcUrgency"
          label="Срочность"
          options={toOptions(URGENCY)}
          value={urgency}
          onChange={setUrgency}
        />
        <Input
          name="calcQuantity"
          label="Количество изделий"
          type="number"
          inputMode="numeric"
          hint={`От 1 до ${MAX_QUANTITY}`}
          value={quantity}
          onChange={setQuantity}
          onBlur={() =>
            setQuantity(
              String(Math.min(Math.max(Number.parseInt(quantity, 10) || 1, 1), MAX_QUANTITY)),
            )
          }
        />
      </div>

      <Card className="flex flex-col gap-3 bg-bg-subtle">
        <div aria-live="polite" className="flex flex-col gap-3">
          <p className="text-sm font-medium text-text-muted">Предварительная стоимость</p>
          <p className="font-heading text-3xl text-text">
            {estimate
              ? `${formatPrice(estimate.min)} – ${formatPrice(estimate.max)}`
              : formatPrice(null)}
          </p>
          {service && (
            <p className="text-text-muted">
              Срок работы: {formatLeadTime(service.leadTimeDays)}
              {urgency === 'urgent' && ' — точный срок при срочном заказе назовёт мастер'}
            </p>
          )}
        </div>
        <p className="text-sm text-text-subtle">
          Расчёт примерный и не является офертой. Точную стоимость мастер называет после
          осмотра изделия и замеров.
        </p>
      </Card>

      {/* Форма заявки убрана с сайта — расчёт уточняют по телефону. */}
      <Card padding="lg" className="flex flex-col items-center gap-4 text-center">
        <p className="font-heading text-xl">Узнать точную цену</p>
        <p className="text-text-muted">
          Позвоните и назовите результат расчёта — мастер уточнит детали и подтвердит стоимость.
        </p>
        <Button size="lg" href={`tel:${CONTACTS.phone}`} iconLeft="phone">
          {CONTACTS.phoneDisplay}
        </Button>
        <MessengerBadges messengers={CONTACTS.messengers} size="sm" />
      </Card>
    </div>
  );
}
