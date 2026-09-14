/**
 * /services — список услуг (ТЗ п.5.2). Владелец файла: Агент 3.
 * На странице ровно один h1, он же заголовок секции.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceGrid } from '@/components/features/ServiceGrid';
import { CtaSection } from '@/components/sections/CtaSection';
import { SERVICES } from '@/content/services';
import { itemListJsonLd, jsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Услуги мастерской: ремонт и пошив одежды',
  description:
    'Что мы делаем: ремонт и подгонка одежды от 500 ₽, пошив на заказ, пошив по ' +
    'индивидуальным меркам. Сроки от 1 дня, гарантия 30 дней.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  const jsonLd = itemListJsonLd(
    SERVICES.map((service) => ({ name: service.title, url: `/services/${service.slug}` })),
  );

  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Услуги' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="Услуги"
            title="Ремонт и пошив одежды"
            subtitle="Три направления работы. Выберите подходящее — на странице услуги есть цены и сроки."
          />
          <ServiceGrid services={SERVICES} columns={2} />
        </Container>
      </Section>

      <CtaSection
        id="contact"
        title="Не нашли свою задачу?"
        description="Позвоните и опишите её — мастер скажет, беремся ли и сколько это будет стоить."
      />

      <script {...jsonLdScriptProps(jsonLd)} />
    </>
  );
}
