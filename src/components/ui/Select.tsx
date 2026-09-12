'use client';

import { useId } from 'react';

import type { SelectProps } from '@/types';
import { Icon } from './Icon';
import { FormField, controlClasses, describedBy } from './FormField';

/** Выпадающий список на нативном select — доступен и работает на мобильных. */
export function Select({
  name,
  label,
  hint,
  error,
  required,
  disabled,
  options,
  value,
  defaultValue,
  placeholder,
  onChange,
  className,
  id,
}: SelectProps) {
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
      <div className="relative">
        <select
          id={controlId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(controlId, hint, error)}
          onChange={(event) => onChange?.(event.target.value)}
          className={controlClasses(error, 'h-[var(--control-h-md)] appearance-none pr-12')}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={20}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-muted"
        />
      </div>
    </FormField>
  );
}
