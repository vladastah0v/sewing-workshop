'use client';

/**
 * WorkStatusBadge — бейдж «Открыто / Закрыто» (ТЗ п.5.8).
 * Владелец: Агент 3. Контракт пропсов: WorkStatusBadgeProps в src/types/ui.ts.
 *
 * Статус считается в часовом поясе мастерской, а не посетителя: клиент из Владивостока
 * должен видеть, открыто ли в Москве. Пояс берётся из contacts.timeZone.
 *
 * Статус вычисляется ТОЛЬКО после монтирования. На сервере «сейчас» другое, чем в браузере,
 * и отрендеренный на сервере бейдж дал бы расхождение гидратации; до монтирования
 * место занимает нейтральная надпись той же высоты — без скачка вёрстки.
 */

import { useEffect, useState } from 'react';

import type { WeekdayIso, WorkStatusBadgeProps, WorkingHours } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

type Status =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; day: 'today' | 'tomorrow' | WeekdayIso }
  | { open: false; opensAt: null; day: null };

const WEEKDAY_FROM_EN: Record<string, WeekdayIso> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

const WEEKDAY_PREPOSITIONAL: Record<WeekdayIso, string> = {
  1: 'в понедельник',
  2: 'во вторник',
  3: 'в среду',
  4: 'в четверг',
  5: 'в пятницу',
  6: 'в субботу',
  7: 'в воскресенье',
};

/** «HH:mm» → минуты от полуночи. */
function toMinutes(time: string): number {
  const [hours = '0', minutes = '0'] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}

/** Текущие день недели и минуты в заданном часовом поясе. */
function nowInZone(timeZone: string): { day: WeekdayIso; minutes: number } | null {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const lookup = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;

  const weekday = lookup('weekday');
  const hour = lookup('hour');
  const minute = lookup('minute');
  if (!weekday || !hour || !minute) return null;

  const day = WEEKDAY_FROM_EN[weekday];
  if (!day) return null;

  // В en-US полночь приходит как «24» — приводим к 0.
  return { day, minutes: (Number(hour) % 24) * 60 + Number(minute) };
}

function resolveStatus(hours: WorkingHours[], timeZone: string): Status | null {
  const now = nowInZone(timeZone);
  if (!now) return null;

  const byDay = new Map<WeekdayIso, WorkingHours>();
  for (const entry of hours) byDay.set(entry.day, entry);

  const today = byDay.get(now.day);
  if (today?.opensAt && today.closesAt) {
    const opens = toMinutes(today.opensAt);
    const closes = toMinutes(today.closesAt);
    if (now.minutes >= opens && now.minutes < closes) {
      return { open: true, closesAt: today.closesAt };
    }
    if (now.minutes < opens) {
      return { open: false, opensAt: today.opensAt, day: 'today' };
    }
  }

  // Ищем ближайший рабочий день в пределах недели.
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (((now.day - 1 + offset) % 7) + 1) as WeekdayIso;
    const entry = byDay.get(nextDay);
    if (entry?.opensAt) {
      return {
        open: false,
        opensAt: entry.opensAt,
        day: offset === 1 ? 'tomorrow' : nextDay,
      };
    }
  }

  return { open: false, opensAt: null, day: null };
}

function statusText(status: Status): string {
  if (status.open) return `Открыто до ${status.closesAt}`;
  if (status.opensAt === null) return 'Часы работы уточняйте по телефону';
  if (status.day === 'today') return `Закрыто, откроется сегодня в ${status.opensAt}`;
  if (status.day === 'tomorrow') return `Закрыто, откроется завтра в ${status.opensAt}`;
  return `Закрыто, откроется ${WEEKDAY_PREPOSITIONAL[status.day]} в ${status.opensAt}`;
}

export function WorkStatusBadge({ workingHours, timeZone, className, id }: WorkStatusBadgeProps) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(resolveStatus(workingHours, timeZone));
    update();
    // Раз в минуту: бейдж не должен врать на странице, открытой в момент закрытия.
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [workingHours, timeZone]);

  if (!status) {
    return (
      <Badge id={id} className={className} tone="neutral">
        Часы работы
      </Badge>
    );
  }

  return (
    <Badge id={id} className={className} tone={status.open ? 'success' : 'neutral'}>
      <span
        aria-hidden
        className={cn('size-2 rounded-full', status.open ? 'bg-success' : 'bg-neutral-400')}
      />
      {statusText(status)}
    </Badge>
  );
}
