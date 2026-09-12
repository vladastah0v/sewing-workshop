'use client';

/**
 * FileUpload — фото к заявке: до 5 штук по 10 МБ (ТЗ п.5.5).
 * Владелец: Агент 4. Контракт пропсов: FileUploadProps в src/types/ui.ts.
 * Файлы уходят по одному в POST /api/uploads через api-client,
 * наружу компонент отдаёт только attachmentIds для LeadRequest/ReviewRequest.
 */

import { useId, useState } from 'react';

import { Icon } from '@/components/ui';
import { FormField, describedBy } from '@/components/ui/FormField';
import { uploadAttachment } from '@/lib/api-client';
import { FORM_LIMITS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { FileUploadProps } from '@/types';
import { formatFileSize } from './formUtils';

interface UploadItem {
  key: string;
  fileName: string;
  size: number;
  status: 'uploading' | 'done' | 'error';
  attachmentId?: string;
  error?: string;
}

const MIME_LABELS: Record<string, string> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
  'image/heic': 'HEIC',
};

export function FileUpload({
  name,
  label,
  hint,
  error,
  maxFiles = FORM_LIMITS.attachmentsMax,
  maxFileSize = FORM_LIMITS.attachmentSizeBytes,
  accept = [...FORM_LIMITS.attachmentMimeTypes],
  onChange,
  className,
  id,
}: FileUploadProps) {
  const controlId = `${useId()}-${name}`;
  const [items, setItems] = useState<UploadItem[]>([]);
  const [listError, setListError] = useState<string | undefined>();

  const busy = items.some((item) => item.status === 'uploading');
  const formats = accept.map((mime) => MIME_LABELS[mime] ?? mime).join(', ');
  const defaultHint = `${formats} — до ${formatFileSize(maxFileSize)}, не больше ${maxFiles} файлов`;

  function emit(next: UploadItem[]) {
    onChange?.(
      next
        .filter((item) => item.status === 'done' && item.attachmentId)
        .map((item) => item.attachmentId as string),
    );
  }

  function patch(key: string, changes: Partial<UploadItem>) {
    setItems((prev) => {
      const next = prev.map((item) => (item.key === key ? { ...item, ...changes } : item));
      emit(next);
      return next;
    });
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setListError(undefined);

    const free = maxFiles - items.length;
    const picked = Array.from(fileList);
    if (picked.length > free) {
      setListError(`Можно добавить ещё ${free > 0 ? free : 0} из ${maxFiles} файлов`);
    }

    for (const file of picked.slice(0, Math.max(free, 0))) {
      const key = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;

      if (!accept.includes(file.type)) {
        setItems((prev) => [
          ...prev,
          { key, fileName: file.name, size: file.size, status: 'error', error: `Формат не подходит, нужен ${formats}` },
        ]);
        continue;
      }

      if (file.size > maxFileSize) {
        setItems((prev) => [
          ...prev,
          { key, fileName: file.name, size: file.size, status: 'error', error: `Файл больше ${formatFileSize(maxFileSize)}` },
        ]);
        continue;
      }

      setItems((prev) => [...prev, { key, fileName: file.name, size: file.size, status: 'uploading' }]);

      const response = await uploadAttachment(file);
      if (response.ok) {
        patch(key, { status: 'done', attachmentId: response.data.attachmentId, error: undefined });
      } else {
        patch(key, { status: 'error', error: response.error.message });
      }
    }
  }

  function remove(key: string) {
    setItems((prev) => {
      const next = prev.filter((item) => item.key !== key);
      emit(next);
      return next;
    });
    setListError(undefined);
  }

  return (
    <FormField
      id={id}
      className={className}
      controlId={controlId}
      name={name}
      label={label}
      hint={hint ?? defaultHint}
      error={error ?? listError}
    >
      <div className="flex flex-col gap-3">
        {/* Прозрачный input поверх зоны: даёт и клик, и перетаскивание, и фокус с клавиатуры */}
        <div
          className={cn(
            'relative flex flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center',
            'bg-bg-subtle transition-colors duration-[var(--duration-fast)] ease-standard',
            'focus-within:border-accent hover:border-text-subtle',
            error || listError ? 'border-error' : 'border-border-strong',
          )}
        >
          <input
            id={controlId}
            name={name}
            type="file"
            multiple={maxFiles > 1}
            accept={accept.join(',')}
            disabled={items.length >= maxFiles}
            aria-describedby={describedBy(controlId, hint ?? defaultHint, error ?? listError)}
            onChange={(event) => {
              void handleFiles(event.target.files);
              event.target.value = '';
            }}
            className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <Icon name="upload" size={28} className="text-text-muted" />
          <p className="font-medium text-text">Перетащите фото или нажмите, чтобы выбрать</p>
          <p className="text-sm text-text-muted">{defaultHint}</p>
        </div>

        {items.length > 0 && (
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item.key}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <Icon
                  name={item.status === 'error' ? 'alert' : 'image'}
                  size={20}
                  className={item.status === 'error' ? 'text-error' : 'text-text-muted'}
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium text-text">{item.fileName}</span>
                  <span className={cn('text-sm', item.status === 'error' ? 'text-error' : 'text-text-muted')}>
                    {item.status === 'uploading' && 'Загружается…'}
                    {item.status === 'done' && formatFileSize(item.size)}
                    {item.status === 'error' && item.error}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => remove(item.key)}
                  aria-label={`Убрать файл ${item.fileName}`}
                  className="grid size-11 shrink-0 place-items-center rounded-md text-text-muted hover:bg-bg-muted hover:text-text"
                >
                  <Icon name="close" size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <span aria-live="polite" className="visually-hidden">
          {busy ? 'Идёт загрузка файлов' : `Прикреплено файлов: ${items.filter((i) => i.status === 'done').length}`}
        </span>
      </div>
    </FormField>
  );
}
