/**
 * PriceTeaserSection — тизер прайса на главной (ТЗ п.5.3). Владелец: Агент 2.
 * Таблицу и дисклеймер о примерных ценах держит PriceTable (Агент 3).
 */

import type { PriceTeaserSectionProps } from '@/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PriceTable } from '@/components/features/PriceTable';

/** Сколько групп прайса показываем на главной, остальное — на странице цен. */
const TEASER_GROUPS = 3;

export function PriceTeaserSection({
  categories,
  heading = 'Цены',
  moreHref,
  className,
  id,
}: PriceTeaserSectionProps) {
  const teaser = categories.slice(0, TEASER_GROUPS);

  return (
    <Section id={id} className={className}>
      <Container>
        <SectionHeading
          eyebrow="Прайс"
          title={heading}
          subtitle="Цены ориентировочные: итог зависит от ткани, фасона и объёма работы."
          action={moreHref ? { label: 'Весь прайс', href: moreHref } : undefined}
        />

        <PriceTable
          categories={teaser}
          showDisclaimer
          defaultOpenGroup={teaser[0]?.group}
        />
      </Container>
    </Section>
  );
}
