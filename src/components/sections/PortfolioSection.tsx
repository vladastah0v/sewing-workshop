/**
 * PortfolioSection — примеры работ на главной (ТЗ п.5.4). Владелец: Агент 2.
 * Ленту фотографий держит WorksCarousel (Агент 3).
 */

import type { PortfolioSectionProps } from '@/types';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WorksCarousel } from '@/components/features/WorksCarousel';

export function PortfolioSection({
  images,
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
          action={moreHref ? { label: 'Все работы', href: moreHref } : undefined}
        />

        {images.length > 0 ? (
          <WorksCarousel images={images} />
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
