import type { EmptyStateProps } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icon } from './Icon';

/** Пустое состояние — например, фильтр портфолио без результатов (ТЗ п.6.2). */
export function EmptyState({ title, description, iconName, action, className, id }: EmptyStateProps) {
  return (
    <div
      id={id}
      className={cn(
        'flex flex-col items-center gap-4 rounded-xl border border-dashed border-border',
        'px-6 py-12 text-center',
        className,
      )}
    >
      {iconName && (
        <span className="grid size-14 place-items-center rounded-full bg-bg-muted text-text-muted">
          <Icon name={iconName} size={28} />
        </span>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-heading text-xl">{title}</p>
        {description && <p className="max-w-[48ch] text-text-muted">{description}</p>}
      </div>
      {action && (
        <Button variant="secondary" href={action.href} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
