/**
 * /contacts — контакты и карта (ТЗ п.5.8). Владелец файла: Агент 3.
 * Полная форма заявки: это единственная страница, где посетитель пришёл именно писать.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactInfo } from '@/components/features/ContactInfo';
import { MapEmbed } from '@/components/features/MapEmbed';
import { RequestForm } from '@/components/forms/RequestForm';
import { CONTACTS } from '@/content/contacts';
import { jsonLdScriptProps, localBusinessJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Контакты: адрес, телефон и режим работы мастерской',
  description: `Швейная мастерская: ${CONTACTS.city}, ${CONTACTS.addressLine}. Телефон ${CONTACTS.phoneDisplay}, ежедневно кроме воскресенья. Как доехать и где припарковаться.`,
  alternates: { canonical: '/contacts' },
};

export default function ContactsPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="Контакты"
            title="Как нас найти"
            subtitle="Приходите без записи или оставьте заявку — перезвоним и предложим удобное время."
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <ContactInfo contacts={CONTACTS} />

            <div className="flex flex-col gap-4">
              <MapEmbed
                coordinates={CONTACTS.coordinates}
                markerTitle={CONTACTS.organizationName}
                height="420px"
              />
              <div className="flex flex-col gap-2 rounded-xl bg-accent-subtle px-5 py-4">
                <p className="font-semibold">Как добраться</p>
                <p className="text-text-muted">
                  Вход со двора, вывеска над дверью. Ближайшая парковка — вдоль дома,
                  первые 30 минут бесплатно. Если не нашли вход, позвоните — встретим.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="request" background="subtle">
        <Container width="narrow">
          <SectionHeading
            align="center"
            title="Оставить заявку"
            subtitle="Опишите задачу и приложите фото изделия — так мастер ответит точнее."
          />
          <RequestForm variant="full" source="contacts" />
        </Container>
      </Section>

      <script {...jsonLdScriptProps(localBusinessJsonLd(CONTACTS))} />
    </>
  );
}
