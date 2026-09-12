'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { LightboxProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

/** Просмотр фото во весь экран (ТЗ п.5.4): стрелки, Escape, свайп-нейтральная разметка. */
export function Lightbox({ open, onClose, images, startIndex = 0, className, id }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(startIndex);

  const total = images.length;
  const go = useCallback(
    (delta: number) => setIndex((current) => (current + delta + total) % total),
    [total],
  );

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, go]);

  const current = images[index];

  return (
    <dialog
      id={id}
      ref={ref}
      onClose={onClose}
      aria-label="Просмотр фотографии"
      className={cn(
        'max-h-none max-w-none bg-transparent p-0',
        'h-full w-full backdrop:bg-neutral-900/90',
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center p-4">
        {current && (
          <Image
            src={current.src}
            alt={current.alt}
            width={1600}
            height={1200}
            className="max-h-[85vh] w-auto object-contain"
          />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-neutral-0/90 text-text"
        >
          <Icon name="close" size={22} />
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-4 grid size-11 place-items-center rounded-full bg-neutral-0/90 text-text"
            >
              <Icon name="chevron-left" size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute right-4 grid size-11 place-items-center rounded-full bg-neutral-0/90 text-text"
            >
              <Icon name="chevron-right" size={22} />
            </button>
            <p className="absolute bottom-4 rounded-full bg-neutral-0/90 px-4 py-1 text-sm text-text">
              {index + 1} из {total}
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
