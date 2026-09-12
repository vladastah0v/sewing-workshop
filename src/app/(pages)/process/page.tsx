/**
 * /process — как мы работаем (ТЗ п.4.7). Владелец файла: Агент 3.
 * Вертикальная раскладка шагов: на отдельной странице у каждого этапа
 * есть развёрнутое описание, в строку они не помещаются.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessSteps } from '@/components/features/ProcessSteps';
import { RequestForm } from '@/components/forms/RequestForm';
import { FAQ } from '@/content/faq';
import { PROCESS_STEPS } from '@/content/process';
import { faqPageJsonLd, jsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Как мы работаем: от заявки до выдачи с гарантией',
  description:
    'Пять шагов заказа в швейной мастерской: заявка и звонок за 15 минут, замер и точная ' +
    'цена, работа, примерка, выдача с гарантией 30 дней. Что входит в гарантию.',
  alternates: { canonical: '/process' },
};

const GUARANTEES = [
  {
    id: 'g-1',
    iconName: 'shield',
    title: 'Цена не меняется',
    text: 'Сумму называем после осмотра и до начала работы. Если по ходу выясняется, что нужно больше — сначала звоним, потом делаем.',
  },
  {
    id: 'g-2',
    iconName: 'clock',
    title: 'Срок держим',
    text: 'Если не успеваем, предупреждаем заранее, а не в день выдачи. За срыв согласованного срока делаем скидку.',
  },
  {
    id: 'g-3',
    iconName: 'check',
    title: 'Переделка бесплатно',
    text: 'Разошёлся шов, заела молния, посадка отличается от согласованной на примерке — исправляем за свой счёт в течение 30 дней.',
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Как мы работаем' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="Процесс"
            title="Как проходит заказ"
            subtitle="Одинаково для подшива брюк и для пошива костюма по меркам — меняется только количество примерок."
          />
          <Container width="narrow" className="px-0">
            <ProcessSteps steps={PROCESS_STEPS} orientation="vertical" />
          </Container>
        </Container>
      </Section>

      <Section background="subtle">
        <Container>
          <SectionHeading
            title="За что мы отвечаем"
            subtitle="Три обещания, которые выполняются без напоминаний и споров."
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUARANTEES.map((item) => (
              <Card as="li" key={item.id} className="flex flex-col gap-3">
                <span className="grid size-12 place-items-center rounded-lg bg-accent-subtle text-brand-700">
                  <Icon name={item.iconName} size={24} />
                </span>
                <h3 className="font-heading text-xl">{item.title}</h3>
                <p className="text-text-muted">{item.text}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading title="Частые вопросы" />
          <Accordion
            items={FAQ.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
            multiple
            defaultOpenIds={['q-1']}
          />
        </Container>
      </Section>

      <Section id="request" background="subtle">
        <Container width="narrow">
          <SectionHeading
            align="center"
            title="Начнём с первого шага"
            subtitle="Оставьте заявку — перезвоним в течение 15 минут в рабочее время."
          />
          <RequestForm variant="full" source="contacts" />
        </Container>
      </Section>

      <script {...jsonLdScriptProps(faqPageJsonLd(FAQ))} />
    </>
  );
}
