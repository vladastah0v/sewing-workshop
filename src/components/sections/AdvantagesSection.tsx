/**
 * AdvantagesSection — «Почему выбирают нас» (ТЗ п.5.1). Владелец: Агент 2.
 * Отдельной фичи под этот блок в реестре нет — собран из примитивов Card и Icon.
 */

import type { AdvantagesSectionProps } from '@/types';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export function AdvantagesSection({
  items,
  heading = 'Почему нам доверяют',
  className,
  id,
}: AdvantagesSectionProps) {
  return (
    <Section id={id} background="subtle" className={cn('bg-stitch', className)}>
      <Container>
        <SectionHeading eyebrow="Преимущества" title={heading} align="center" />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => (
            <Card key={item.id} as="li" className="flex flex-col gap-3">
              {item.iconName && (
                <span className="grid size-12 place-items-center rounded-full bg-accent-subtle text-accent">
                  <Icon name={item.iconName} size={24} />
                </span>
              )}
              <h3 className="font-heading text-xl">{item.title}</h3>
              <p className="text-text-muted">{item.description}</p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
