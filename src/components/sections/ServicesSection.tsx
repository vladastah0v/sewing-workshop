/**
 * ServicesSection — витрина услуг на главной (ТЗ п.5.2). Владелец: Агент 2.
 * Карточки рисует ServiceGrid (Агент 3) — секция отвечает только за обрамление.
 */

import type { ServicesSectionProps } from '@/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceGrid } from '@/components/features/ServiceGrid';

export function ServicesSection({
  services,
  heading = 'Что мы делаем',
  moreHref,
  className,
  id,
}: ServicesSectionProps) {
  return (
    <Section id={id} className={className}>
      <Container>
        <SectionHeading
          eyebrow="Услуги"
          title={heading}
          subtitle="Ремонт, подгонка по фигуре и пошив с нуля. Точную цену называем после замера."
          action={moreHref ? { label: 'Все услуги', href: moreHref } : undefined}
        />

        <ServiceGrid
          services={services}
          columns={3}
          emptyMessage="Список услуг обновляется. Позвоните — подскажем по вашей задаче."
        />
      </Container>
    </Section>
  );
}
