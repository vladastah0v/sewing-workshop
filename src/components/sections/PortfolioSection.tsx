/**
 * PortfolioSection — примеры работ на главной (ТЗ п.5.4). Владелец: Агент 2.
 * Сетку и лайтбокс держит PortfolioGallery (Агент 3); фильтры на главной не нужны.
 */

import type { PortfolioSectionProps } from '@/types';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioGallery } from '@/components/features/PortfolioGallery';

/** Сколько работ показываем в тизере на главной. */
const TEASER_COUNT = 6;

export function PortfolioSection({
  items,
  heading = 'Наши работы',
  moreHref,
  className,
  id,
}: PortfolioSectionProps) {
  return (
    <Section id={id} className={className}>
      <Container>
        <SectionHeading
          eyebrow="Портфолио"
          title={heading}
          subtitle="Фотографии до и после — без ретуши."
          action={moreHref ? { label: 'Все работы', href: moreHref } : undefined}
        />

        {items.length > 0 ? (
          <PortfolioGallery
            items={items.slice(0, TEASER_COUNT)}
            showFilters={false}
            columns={3}
            initialCount={TEASER_COUNT}
          />
        ) : (
          <EmptyState
            iconName="image"
            title="Фотографии готовим"
            description="Свежие работы появятся здесь в ближайшее время."
            action={moreHref ? { label: 'Смотреть портфолио', href: moreHref } : undefined}
          />
        )}
      </Container>
    </Section>
  );
}
