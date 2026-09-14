/**
 * /portfolio — работы мастерской (ТЗ п.5.4). Владелец файла: Агент 3.
 * Листание живёт внутри клиентского WorksCarousel,
 * поэтому сама страница остаётся серверной и отдаёт метатеги.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WorksCarousel } from '@/components/features/WorksCarousel';
import { CtaSection } from '@/components/sections/CtaSection';
import { WORKS, WORKS_ALBUM_URL } from '@/content/works';

export const metadata: Metadata = {
  title: 'Наши работы: фото изделий мастерской',
  description:
    'Портфолио швейной мастерской: фотографии изделий, сшитых на заказ и по ' +
    'индивидуальным меркам.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
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
          />
          <WorksCarousel images={WORKS} />
          <a
            href={WORKS_ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-lg font-semibold text-text-link hover:text-accent-active"
          >
            Здесь вы можете посмотреть остальные работы нашей мастерской
          </a>
        </Container>
      </Section>

      <CtaSection
        id="contact"
        title="Хотите так же?"
        description="Позвоните и опишите свою вещь — скажем, что с ней можно сделать и сколько это будет стоить."
      />
    </>
  );
}
