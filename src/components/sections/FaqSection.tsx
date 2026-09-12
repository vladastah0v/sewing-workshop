/**
 * FaqSection — частые вопросы (ТЗ п.5.9). Владелец: Агент 2.
 * Раскрытие — примитив Accordion (Агент 1), плюс микроразметка FAQPage.
 */

import type { FaqSectionProps } from '@/types';
import { Accordion } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FaqSection({ items, heading = 'Частые вопросы', className, id }: FaqSectionProps) {
  const [firstItem] = items;
  if (!firstItem) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <Section id={id} className={className}>
      <Container width="narrow">
        <SectionHeading eyebrow="Вопросы" title={heading} align="center" />

        <Accordion
          items={items.map((item) => ({
            id: item.id,
            title: item.question,
            content: <p>{item.answer}</p>,
          }))}
          defaultOpenIds={[firstItem.id]}
        />
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
