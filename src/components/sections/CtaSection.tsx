/**
 * CtaSection — финальный призыв к действию. Владелец: Агент 2.
 * mode='form' — встроенная заявка (RequestForm, Агент 4), mode='button' — одна кнопка.
 */

import type { CtaSectionProps } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RequestForm } from '@/components/forms/RequestForm';

export function CtaSection({
  title,
  description,
  source,
  mode = 'form',
  cta,
  className,
  id,
}: CtaSectionProps) {
  return (
    <Section id={id} background="muted" className={className}>
      <Container width="narrow">
        <SectionHeading title={title} subtitle={description} align="center" />

        {mode === 'form' ? (
          <Card padding="lg">
            <RequestForm variant="compact" source={source} />
          </Card>
        ) : (
          cta && (
            <div className="flex justify-center">
              <Button size="lg" href={cta.href} iconRight="arrow-right">
                {cta.label}
              </Button>
            </div>
          )
        )}
      </Container>
    </Section>
  );
}
