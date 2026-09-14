/**
 * AboutSection — «О мастерской» на главной, между услугами и работами. Владелец: Агент 2.
 * Название мастерской в заголовке — рукописным шрифтом, как в шапке.
 */

import type { AboutSectionProps } from '@/types';
import { SITE_NAME } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutSection({ heading, paragraphs, className, id }: AboutSectionProps) {
  return (
    <Section id={id} background="subtle" className={className}>
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          eyebrow="О мастерской"
          title={
            <>
              <span className="font-script text-[1.4em] leading-tight font-normal">{SITE_NAME}</span>
              {` — ${heading}`}
            </>
          }
          className="mb-0 lg:mb-0"
        />

        <div className="flex max-w-[65ch] flex-col gap-5 text-lg text-text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
