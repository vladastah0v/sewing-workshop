/**
 * MapSection — контакты и карта на главной (ТЗ п.5.8). Владелец: Агент 2.
 * Реквизиты и статус «Открыто/Закрыто» — ContactInfo, карта — MapEmbed (Агент 3).
 */

import type { MapSectionProps } from '@/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactInfo } from '@/components/features/ContactInfo';
import { MapEmbed } from '@/components/features/MapEmbed';

export function MapSection({ contacts, heading = 'Где нас найти', className, id }: MapSectionProps) {
  return (
    <Section id={id} background="subtle" className={className}>
      <Container>
        <SectionHeading
          eyebrow="Контакты"
          title={heading}
          subtitle={`${contacts.city}, ${contacts.addressLine}`}
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
          <ContactInfo contacts={contacts} showStatus layout="stacked" />

          <div className="overflow-hidden rounded-xl border border-border">
            <MapEmbed
              coordinates={contacts.coordinates}
              zoom={16}
              markerTitle={contacts.organizationName}
              height="400px"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
