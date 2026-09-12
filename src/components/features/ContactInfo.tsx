/**
 * ContactInfo — блок контактов (ТЗ п.5.8).
 * Владелец: Агент 3. Контракт пропсов: ContactInfoProps в src/types/ui.ts.
 *
 * Телефон и почта — настоящие ссылки tel:/mailto:, адрес — в address.
 * Клик по телефону уходит целью в аналитику, поэтому обработчик ставит
 * не этот компонент, а форма/шапка Агента 4 и Агента 1 — здесь чистая разметка.
 */

import type { ContactInfoData, ContactInfoProps, WeekdayIso } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { WorkStatusBadge } from './WorkStatusBadge';

const WEEKDAY_SHORT: Record<WeekdayIso, string> = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  7: 'Вс',
};

const MESSENGER_ICON = {
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  viber: 'viber',
  vk: 'chevron-right',
  max: 'chevron-right',
} as const;

/**
 * Сворачиваем одинаковые подряд идущие дни: «Пн–Пт 10:00–20:00».
 * Семь отдельных строк читаются хуже и занимают лишний экран на телефоне.
 */
function groupHours(hours: ContactInfoData['workingHours']) {
  const sorted = [...hours].sort((a, b) => a.day - b.day);
  const groups: { from: WeekdayIso; to: WeekdayIso; opensAt: string | null; closesAt: string | null }[] = [];

  for (const entry of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.opensAt === entry.opensAt && last.closesAt === entry.closesAt && last.to === entry.day - 1) {
      last.to = entry.day;
    } else {
      groups.push({ from: entry.day, to: entry.day, opensAt: entry.opensAt, closesAt: entry.closesAt });
    }
  }

  return groups.map((group) => ({
    days:
      group.from === group.to
        ? WEEKDAY_SHORT[group.from]
        : `${WEEKDAY_SHORT[group.from]}–${WEEKDAY_SHORT[group.to]}`,
    time:
      group.opensAt && group.closesAt
        ? `${group.opensAt}–${group.closesAt}`
        : 'выходной',
  }));
}

export function ContactInfo({
  contacts,
  showStatus = true,
  layout = 'stacked',
  className,
  id,
}: ContactInfoProps) {
  const hours = groupHours(contacts.workingHours);
  const isInline = layout === 'inline';

  const rowClass = 'flex items-start gap-3';
  const iconClass = 'mt-0.5 shrink-0 text-accent';

  return (
    <div
      id={id}
      className={cn(
        'flex gap-6',
        isInline ? 'flex-col sm:flex-row sm:flex-wrap sm:gap-10' : 'flex-col',
        className,
      )}
    >
      <div className={rowClass}>
        <Icon name="phone" size={22} className={iconClass} />
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-muted">Телефон</span>
          <a href={`tel:${contacts.phone}`} className="text-lg font-semibold hover:text-accent">
            {contacts.phoneDisplay}
          </a>
        </div>
      </div>

      <div className={rowClass}>
        <Icon name="mail" size={22} className={iconClass} />
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-muted">Почта</span>
          <a href={`mailto:${contacts.email}`} className="font-semibold hover:text-accent">
            {contacts.email}
          </a>
        </div>
      </div>

      <div className={rowClass}>
        <Icon name="map-pin" size={22} className={iconClass} />
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-muted">Адрес</span>
          <address className="font-semibold not-italic">
            {contacts.city}, {contacts.addressLine}
          </address>
        </div>
      </div>

      <div className={rowClass}>
        <Icon name="clock" size={22} className={iconClass} />
        <div className="flex flex-col gap-2">
          <span className="text-sm text-text-muted">Режим работы</span>
          <dl className="flex flex-col gap-1">
            {hours.map((row) => (
              <div key={row.days} className="flex gap-3">
                <dt className="w-16 shrink-0 font-semibold">{row.days}</dt>
                <dd className="text-text-muted">{row.time}</dd>
              </div>
            ))}
          </dl>
          {showStatus && (
            <WorkStatusBadge
              workingHours={contacts.workingHours}
              timeZone={contacts.timeZone}
              className="self-start"
            />
          )}
        </div>
      </div>

      {contacts.messengers.length > 0 && (
        <div className={rowClass}>
          <Icon name="telegram" size={22} className={iconClass} />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-text-muted">Мессенджеры</span>
            <ul className="flex flex-wrap gap-2">
              {contacts.messengers.map((messenger) => (
                <li key={messenger.kind}>
                  <a
                    href={messenger.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 font-medium transition-colors duration-[var(--duration-fast)] ease-standard hover:bg-bg-subtle"
                  >
                    <Icon name={MESSENGER_ICON[messenger.kind]} size={20} />
                    {messenger.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
