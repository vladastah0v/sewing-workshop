/**
 * MasterCard — карточка мастера, страница «О мастерской» (ТЗ п.4.6).
 * Владелец: Агент 3. Контракт пропсов: MasterCardProps в src/types/ui.ts.
 *
 * Фото у мастеров опционально и до ответа заказчика (открытый вопрос №4) его нет —
 * вместо «битой» рамки показываем инициалы.
 */

import Image from 'next/image';

import type { MasterCardProps } from '@/types';
import { cn } from '@/lib/utils';
import { SERVICE_LABELS } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

/** «Ирина Соколова» → «ИС». */
function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.slice(0, 1))
    .join('');
}

/** 18 → «18 лет опыта». */
function experienceLabel(years: number): string {
  const mod10 = years % 10;
  const mod100 = years % 100;
  const word =
    mod10 === 1 && mod100 !== 11
      ? 'год'
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? 'года'
        : 'лет';
  return `${years} ${word} опыта`;
}

export function MasterCard({ master, className, id }: MasterCardProps) {
  return (
    <Card as="li" id={id} className={cn('flex h-full flex-col gap-4', className)}>
      <div className="flex items-center gap-4">
        {master.photo ? (
          <Image
            src={master.photo.src}
            alt={master.photo.alt}
            width={72}
            height={72}
            className="size-18 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="grid size-18 shrink-0 place-items-center rounded-full bg-accent-subtle font-heading text-2xl text-brand-700"
          >
            {initials(master.name)}
          </span>
        )}

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-heading text-xl">{master.name}</h3>
          <p className="text-sm text-text-muted">{master.role}</p>
        </div>
      </div>

      <p className="font-semibold text-accent">{experienceLabel(master.experienceYears)}</p>

      {master.bio && <p className="flex-1 text-text-muted">{master.bio}</p>}

      {master.specialties && master.specialties.length > 0 && (
        <ul className="flex flex-wrap gap-2 border-t border-border pt-4">
          {master.specialties.map((slug) => (
            <li key={slug}>
              <Badge>{SERVICE_LABELS[slug]}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
