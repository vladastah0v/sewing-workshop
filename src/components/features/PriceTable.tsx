/**
 * PriceTable — прайс-лист по группам (ТЗ п.5.3).
 * Владелец: Агент 3. Контракт пропсов: PriceTableProps в src/types/ui.ts.
 *
 * До md — аккордеон (семь групп подряд на телефоне нечитаемы),
 * от md — обычные таблицы: цену со сроком сравнивают глазами по столбцам.
 * Серверный компонент: Accordion принимает готовый ReactNode в content.
 */

import type { AccordionItem, PriceCategoryData, PriceItem, PriceTableProps } from '@/types';
import { cn, formatLeadTime, formatPrice } from '@/lib/utils';
import { Accordion } from '@/components/ui/Accordion';

/** «от 700 ₽», «700–1 400 ₽», «по замерам». */
function priceLabel(item: PriceItem): string {
  if (item.priceFrom === null) return 'по замерам';
  if (item.priceTo != null && item.priceTo !== item.priceFrom) {
    return `${new Intl.NumberFormat('ru-RU').format(item.priceFrom)}–${formatPrice(item.priceTo)}`;
  }
  return `от ${formatPrice(item.priceFrom)}`;
}

function ItemRows({ items }: { items: PriceItem[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="visually-hidden">Цены и сроки по услугам группы</caption>
      <thead>
        <tr className="border-b border-border text-sm text-text-muted">
          <th scope="col" className="py-3 pr-4 font-medium">
            Услуга
          </th>
          <th scope="col" className="py-3 pr-4 font-medium whitespace-nowrap">
            Цена
          </th>
          <th scope="col" className="py-3 font-medium whitespace-nowrap">
            Срок
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-border last:border-0 align-top">
            <th scope="row" className="py-4 pr-4 font-normal">
              {item.title}
              {item.unit && <span className="text-text-subtle"> ({item.unit})</span>}
              {item.note && <span className="block text-sm text-text-muted">{item.note}</span>}
            </th>
            <td className="py-4 pr-4 font-semibold whitespace-nowrap">{priceLabel(item)}</td>
            <td className="py-4 whitespace-nowrap text-text-muted">
              {item.leadTimeDays ? formatLeadTime(item.leadTimeDays) : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GroupBlock({ category }: { category: PriceCategoryData }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-heading text-2xl">{category.title}</h3>
      {/* Таблица шире экрана прокручивается сама, страница по горизонтали — нет. */}
      <div className="overflow-x-auto">
        <ItemRows items={category.items} />
      </div>
    </section>
  );
}

export function PriceTable({
  categories,
  showDisclaimer = true,
  defaultOpenGroup,
  className,
  id,
}: PriceTableProps) {
  const accordionItems: AccordionItem[] = categories.map((category) => ({
    id: category.group,
    title: category.title,
    content: (
      <div className="overflow-x-auto">
        <ItemRows items={category.items} />
      </div>
    ),
  }));

  const firstGroup = categories[0]?.group;
  const openId = defaultOpenGroup ?? firstGroup;

  return (
    <div id={id} className={cn('flex flex-col gap-8', className)}>
      <div className="md:hidden">
        <Accordion items={accordionItems} defaultOpenIds={openId ? [openId] : []} />
      </div>

      <div className="hidden flex-col gap-12 md:flex">
        {categories.map((category) => (
          <GroupBlock key={category.group} category={category} />
        ))}
      </div>

      {showDisclaimer && (
        <p className="rounded-lg bg-accent-subtle px-5 py-4 text-text-muted">
          Цены ориентировочные. Точную стоимость мастер называет после осмотра изделия и
          замера — до начала работы. Согласованная сумма больше не меняется.
        </p>
      )}
    </div>
  );
}
