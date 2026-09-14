/**
 * /prices — прайс-лист (ТЗ п.5.3). Владелец файла: Агент 3.
 * Дисклеймер о примерных ценах обязателен и выводится самим PriceTable.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PriceTable } from '@/components/features/PriceTable';
import { CtaSection } from '@/components/sections/CtaSection';
import { PRICES } from '@/content/prices';

export const metadata: Metadata = {
  title: 'Цены на ремонт и пошив одежды — прайс-лист мастерской',
  description:
    'Прайс-лист: подшив брюк от 500 ₽, подгонка платья от 1 200 ₽, замена молнии в куртке ' +
    'от 1 000 ₽, пошив на заказ от 3 000 ₽. Точную сумму называем после замера.',
  alternates: { canonical: '/prices' },
};

export default function PricesPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Цены' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="Прайс-лист"
            title="Цены на ремонт и пошив одежды"
            subtitle="Семь групп работ — от подшива брюк до пошива по индивидуальным меркам. Осмотр и консультация бесплатные."
          />
          <PriceTable categories={PRICES} defaultOpenGroup="women" />
        </Container>
      </Section>

      <CtaSection
        id="contact"
        title="Нужна точная цена?"
        description="Точную стоимость мастер называет после осмотра изделия. Позвоните — подскажем по телефону."
      />
    </>
  );
}
