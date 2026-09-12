'use client';

import { useId } from 'react';

import type { CheckboxProps } from '@/types';
import { cn } from '@/lib/utils';

/** Чекбокс. label принимает ReactNode — туда кладут ссылку на политику. */
export function Checkbox({
  name,
  label,
  checked,
  defaultChecked,
  error,
  required,
  disabled,
  onChange,
  className,
  id,
}: CheckboxProps) {
  const controlId = `${useId()}-${name}`;

  return (
    <div id={id} className={cn('flex flex-col gap-2', className)}>
      {/* Зона нажатия — вся строка с текстом, это даёт тач-цель больше 44px */}
      <label htmlFor={controlId} className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
        <input
          id={controlId}
          name={name}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${controlId}-error` : undefined}
          onChange={(event) => onChange?.(event.target.checked)}
          className={cn(
            'mt-0.5 size-5 shrink-0 rounded-sm accent-[var(--color-accent)]',
            error && 'outline outline-error',
          )}
        />
        <span>{label}</span>
      </label>

      {error && (
        <p id={`${controlId}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
