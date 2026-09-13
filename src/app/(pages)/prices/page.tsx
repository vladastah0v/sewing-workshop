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
import { FAQ } from '@/content/faq';
import { PRICES } from '@/content/prices';
import { faqPageJsonLd, jsonLdScriptProps } from '@/lib/seo';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Цены на ремонт и пошив одежды — прайс-лист мастерской',
  description:
    'Прайс-лист: подшив брюк от 600 ₽, подгонка платья от 1 200 ₽, замена молнии в куртке ' +
    'от 1 500 ₽, пошив на заказ от 4 500 ₽. Точную сумму называем после замера.',
  alternates: { canonical: '/prices' },
};

/** На странице цен показываем вопросы про деньги и сроки. */
const PRICE_FAQ = FAQ.filter((item) => ['q-2', 'q-7', 'q-8', 'q-6'].includes(item.id));

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

      <Section>
        <Container width="narrow">
          <SectionHeading title="Вопросы про оплату и сроки" />
          <Accordion
            items={PRICE_FAQ.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
            multiple
          />
        </Container>
      </Section>

      <CtaSection
        id="contact"
        title="Нужна точная цена?"
        description="Точную стоимость мастер называет после осмотра изделия. Позвоните — подскажем по телефону."
      />

      <script {...jsonLdScriptProps(faqPageJsonLd(PRICE_FAQ))} />
    </>
  );
}
