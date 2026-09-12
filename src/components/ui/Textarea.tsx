'use client';

import { useId } from 'react';

import type { TextareaProps } from '@/types';
import { FormField, controlClasses, describedBy } from './FormField';

/** Многострочное поле. Владелец: Агент 1. */
export function Textarea({
  name,
  label,
  hint,
  error,
  required,
  disabled,
  placeholder,
  value,
  defaultValue,
  rows = 4,
  maxLength,
  onChange,
  onBlur,
  className,
  id,
}: TextareaProps) {
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
      <textarea
        id={controlId}
        name={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(controlId, hint, error)}
        onChange={(event) => onChange?.(event.target.value)}
        onBlur={onBlur}
        className={controlClasses(error, 'resize-y py-3 leading-normal')}
      />
    </FormField>
  );
}
