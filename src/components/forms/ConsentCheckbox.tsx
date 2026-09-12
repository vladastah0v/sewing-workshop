'use client';

/**
 * ConsentCheckbox — согласие на обработку персональных данных (152-ФЗ).
 * Владелец: Агент 4. Контракт пропсов: ConsentCheckboxProps в src/types/ui.ts.
 * Обязателен во всех формах проекта: без него заявка не уходит.
 */

import Link from 'next/link';

import { Checkbox } from '@/components/ui';
import type { ConsentCheckboxProps } from '@/types';

export function ConsentCheckbox({
  name = 'consent',
  checked,
  error,
  disabled,
  onChange,
  policyHref = '/privacy',
  className,
  id,
}: ConsentCheckboxProps) {
  return (
    <Checkbox
      id={id}
      className={className}
      name={name}
      checked={checked ?? false}
      required
      disabled={disabled}
      error={error}
      onChange={onChange}
      label={
        <>
          Согласен на обработку персональных данных и принимаю{' '}
          <Link
            href={policyHref}
            target="_blank"
            rel="noreferrer"
            className="text-text-link underline underline-offset-2"
          >
            политику конфиденциальности
          </Link>
        </>
      }
    />
  );
}
