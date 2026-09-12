'use client';

import { useId } from 'react';

import type { InputProps } from '@/types';
import { FormField, controlClasses, describedBy } from './FormField';

/** Текстовое поле. Владелец: Агент 1. */
export function Input({
  name,
  label,
  hint,
  error,
  required,
  disabled,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  autoComplete,
  inputMode,
  onChange,
  onBlur,
  className,
  id,
}: InputProps) {
  const controlId = `${useId()}-${name}`;

  return (
    <FormField
      id={id}
      controlId={controlId}
      name={name}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <input
        id={controlId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(controlId, hint, error)}
        onChange={(event) => onChange?.(event.target.value)}
        onBlur={onBlur}
        className={controlClasses(error, 'h-[var(--control-h-md)]')}
      />
    </FormField>
  );
}
