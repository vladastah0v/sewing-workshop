import type { FormFieldProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * FormField — обвязка любого поля: подпись, подсказка, сообщение об ошибке.
 * Владелец: Агент 1.
 *
 * Контрол внутри обязан получить id={controlId} и aria-describedby из
 * describedBy() — иначе скринридер не свяжет поле с текстом ошибки (ТЗ п.6.4).
 */
export function FormField({
  controlId,
  label,
  hint,
  error,
  required,
  children,
  className,
  id,
}: FormFieldProps) {
  return (
    <div id={id} className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={controlId} className="text-sm font-medium text-text">
        {label}
        {required && (
          <>
            <span aria-hidden className="ml-1 text-error">
              *
            </span>
            <span className="visually-hidden">, обязательное поле</span>
          </>
        )}
      </label>

      {children}

      {hint && !error && (
        <p id={`${controlId}-hint`} className="text-sm text-text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${controlId}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Собирает aria-describedby для контрола внутри FormField. */
export function describedBy(controlId: string, hint?: string, error?: string): string | undefined {
  if (error) return `${controlId}-error`;
  if (hint) return `${controlId}-hint`;
  return undefined;
}

/** Общие классы контролов: одна высота, один фокус, одна рамка ошибки. */
export function controlClasses(error?: string, extra?: string): string {
  return cn(
    'w-full rounded-lg border bg-surface px-4 text-base text-text',
    'placeholder:text-text-subtle',
    'transition-colors duration-[var(--duration-fast)] ease-standard',
    'disabled:cursor-not-allowed disabled:bg-bg-muted disabled:opacity-60',
    error ? 'border-error' : 'border-border-strong hover:border-text-subtle',
    extra,
  );
}
