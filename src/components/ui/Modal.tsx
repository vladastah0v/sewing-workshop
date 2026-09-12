'use client';

import { useEffect, useId, useRef } from 'react';

import type { ModalProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

const SIZES = { sm: 'max-w-[26rem]', md: 'max-w-[36rem]', lg: 'max-w-[52rem]' } as const;

/**
 * Modal на нативном dialog: ловушка фокуса, Escape и inert фона —
 * от браузера, без библиотек и без ошибок ручной реализации.
 */
export function Modal({ open, onClose, title, description, size = 'md', children, className, id }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = `${useId()}-title`;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Блокируем прокрутку страницы, пока модалка открыта.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      id={id}
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // Клик по подложке: цель — сам dialog, а не его содержимое.
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        'w-[calc(100vw-2rem)] rounded-xl border border-border bg-surface p-0 text-text shadow-lg',
        'backdrop:bg-neutral-900/50',
        SIZES[size],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-6">
        <div className="flex flex-col gap-2">
          <h2 id={titleId} className="font-heading text-2xl">
            {title}
          </h2>
          {description && <p className="text-text-muted">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="grid size-11 shrink-0 place-items-center rounded-lg text-text-muted hover:bg-bg-muted"
        >
          <Icon name="close" size={22} />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
