/**
 * MapEmbed — карта проезда (ТЗ п.5.8).
 * Владелец: Агент 3. Контракт пропсов: MapEmbedProps в src/types/ui.ts.
 *
 * Виджет Яндекс.Карт в iframe: без JS-API, без ключа и без новой зависимости.
 * loading="lazy" — карта не тянет мегабайты в LCP главной (ТЗ п.7.2).
 * Ссылка «Открыть в Яндекс.Картах» обязательна: iframe недоступен, если у посетителя
 * заблокированы сторонние фреймы, и не годится для скринридера.
 */

import type { MapEmbedProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function MapEmbed({
  coordinates,
  zoom = 16,
  markerTitle,
  height = '400px',
  className,
  id,
}: MapEmbedProps) {
  const [latitude, longitude] = coordinates;
  // Яндекс принимает координаты в порядке «долгота,широта».
  const point = `${longitude},${latitude}`;

  const widgetSrc = `https://yandex.ru/map-widget/v1/?ll=${encodeURIComponent(point)}&z=${zoom}&pt=${encodeURIComponent(`${point},pm2rdm`)}`;
  const externalHref = `https://yandex.ru/maps/?ll=${encodeURIComponent(point)}&z=${zoom}&pt=${encodeURIComponent(point)}`;

  const title = markerTitle ? `Карта: ${markerTitle}` : 'Карта проезда';

  return (
    <div id={id} className={cn('flex flex-col gap-3', className)}>
      <div className="overflow-hidden rounded-xl border border-border" style={{ height }}>
        <iframe
          src={widgetSrc}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start font-semibold text-text-link hover:text-accent-active"
      >
        <Icon name="map-pin" size={20} />
        Открыть в Яндекс.Картах
      </a>
    </div>
  );
}
