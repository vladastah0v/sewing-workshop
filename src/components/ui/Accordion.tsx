'use client';

import { useId, useState } from 'react';

import type { AccordionProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

/** Аккордеон: FAQ и прайс на мобильных. Владелец: Агент 1. */
export function Accordion({ items, multiple = false, defaultOpenIds = [], className, id }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);
  const uid = useId();

  const toggle = (itemId: string) => {
    setOpenIds((current) => {
      if (current.includes(itemId)) return current.filter((x) => x !== itemId);
      return multiple ? [...current, itemId] : [itemId];
    });
  };

  return (
    <div id={id} className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${uid}-${item.id}-button`;
        const panelId = `${uid}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium hover:text-accent"
              >
                <span>{item.title}</span>
                <Icon
                  name="chevron-down"
                  size={22}
                  className={cn(
                    'shrink-0 text-text-muted transition-transform duration-[var(--duration-normal)] ease-standard',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <div className="pb-5 text-text-muted">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
