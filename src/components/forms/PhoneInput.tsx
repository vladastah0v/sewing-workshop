'use client';

/**
 * PhoneInput — телефон с маской «+7 (999) 999-99-99».
 * Владелец: Агент 4. Контракт пропсов: PhoneInputProps в src/types/ui.ts.
 * Наружу отдаёт отформатированную строку; в E.164 её приводит toE164()
 * из src/lib/validation.ts — формат номера описан ровно в одном месте.
 */

import { useState } from 'react';

import { Input } from '@/components/ui';
import type { PhoneInputProps } from '@/types';

const DEFAULT_MASK = '+7 (999) 999-99-99';
const PLACEHOLDER = '+7 (999) 123-45-67';

/**
 * Накладывает маску: «9» — слот под цифру, остальные символы литералы.
 * Цифра-литерал (код страны «7») съедает соответствующую цифру ввода,
 * поэтому «8 999…» и «+7 999…» дают один и тот же результат.
 */
export function applyPhoneMask(raw: string, mask: string = DEFAULT_MASK): string {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  if (mask.startsWith('+7')) {
    if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
    else if (!digits.startsWith('7')) digits = `7${digits}`;
  }

  const capacity = mask.split('').filter((char) => /\d/.test(char)).length;
  digits = digits.slice(0, capacity);

  let out = '';
  let index = 0;

  for (const char of mask) {
    if (index >= digits.length) break;
    if (char === '9') {
      out += digits[index];
      index += 1;
    } else {
      if (/\d/.test(char) && digits[index] === char) index += 1;
      out += char;
    }
  }

  return out;
}

export function PhoneInput({
  mask = DEFAULT_MASK,
  name,
  label,
  hint,
  error,
  required,
  disabled,
  placeholder = PLACEHOLDER,
  value,
  defaultValue,
  autoComplete = 'tel',
  onChange,
  onBlur,
  className,
  id,
}: PhoneInputProps) {
  const [inner, setInner] = useState(() => applyPhoneMask(defaultValue ?? '', mask));
  const display = value === undefined ? inner : applyPhoneMask(value, mask);

  function handleChange(next: string) {
    let candidate = next;

    // Backspace по символу маски («)» или пробелу) не меняет набор цифр —
    // без этого удаление упирается в литерал и выглядит как зависание.
    const sameDigits = next.replace(/\D/g, '').length === display.replace(/\D/g, '').length;
    if (next.length < display.length && sameDigits) {
      candidate = next.replace(/\d(?=\D*$)/, '');
    }

    const masked = applyPhoneMask(candidate, mask);
    if (value === undefined) setInner(masked);
    onChange?.(masked);
  }

  return (
    <Input
      id={id}
      className={className}
      name={name}
      label={label}
      hint={hint}
      error={error}
      required={required}
      disabled={disabled}
      type="tel"
      inputMode="tel"
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={display}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
}
