/**
 * /portfolio — работы мастерской (ТЗ п.5.4). Владелец файла: Агент 3.
 * Фильтр, догрузка и просмотр «до/после» живут внутри PortfolioGallery,
 * поэтому сама страница остаётся серверной и отдаёт метатеги.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioGallery } from '@/components/features/PortfolioGallery';
import { RequestForm } from '@/components/forms/RequestForm';
import { PORTFOLIO } from '@/content/portfolio';
import { itemListJsonLd, jsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Наши работы: фото до и после ремонта и пошива одежды',
  description:
    'Портфолио швейной мастерской: подгонка пальто, замена молний, реставрация кожи и меха, ' +
    'пошив по индивидуальным меркам. Фотографии до и после с описанием работы.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const withBeforeAfter = PORTFOLIO.filter((item) => item.before).length;

  const jsonLd = itemListJsonLd(
    PORTFOLIO.map((item) => ({ name: item.title, url: `/portfolio#${item.slug}` })),
  );

  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Работы' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="Портфолио"
            title="Работы мастерской"
            subtitle={`${PORTFOLIO.length} работ, из них ${withBeforeAfter} — со сравнением «до и после». Нажмите на карточку, чтобы рассмотреть.`}
          />
          <PortfolioGallery items={PORTFOLIO} columns={3} initialCount={6} />
        </Container>
      </Section>

      <Section id="request" background="subtle">
        <Container width="narrow">
          <SectionHeading
            align="center"
            title="Хотите так же?"
            subtitle="Пришлите фото своей вещи — скажем, что с ней можно сделать и сколько это будет стоить."
          />
          <RequestForm variant="full" source="portfolio" />
        </Container>
      </Section>

      <script {...jsonLdScriptProps(jsonLd)} />
    </>
  );
}
