/**
 * ProcessSection — «Как мы работаем» (ТЗ п.4.7). Владелец: Агент 2.
 * Шаги рисует ProcessSteps (Агент 3).
 */

import type { ProcessSectionProps } from '@/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessSteps } from '@/components/features/ProcessSteps';

export function ProcessSection({
  steps,
  heading = 'Как мы работаем',
  className,
  id,
}: ProcessSectionProps) {
  return (
    <Section id={id} background="subtle" className={className}>
      <Container>
        <SectionHeading
          eyebrow="Процесс"
          title={heading}
          subtitle="Пять шагов от заявки до готового изделия."
          align="center"
        />

        <ProcessSteps steps={[...steps].sort((a, b) => a.order - b.order)} orientation="horizontal" />
      </Container>
    </Section>
  );
}
