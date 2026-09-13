/**
 * CtaSection — финальный призыв к действию. Владелец: Агент 2.
 *
 * Решением заказчика от 13.09.2026 форма заявки убрана с сайта: единственный
 * канал обращения — телефон. Поэтому секция показывает номер крупной кнопкой,
 * рядом — режим работы и значки мессенджеров (косметические, см.
 * MessengerBadges). Никаких пустых блоков вместо удалённой формы не остаётся.
 */

import type { CtaSectionProps } from '@/types';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MessengerBadges } from '@/components/ui/MessengerBadges';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACTS } from '@/content/contacts';
import { cn } from '@/lib/utils';

export function CtaSection({ title, description, className, id }: CtaSectionProps) {
  return (
    <Section id={id} background="muted" className={cn('bg-stitch', className)}>
      <Container width="narrow">
        <SectionHeading title={title} subtitle={description} align="center" />

        <div className="flex flex-col items-center gap-5">
          <Button size="lg" href={`tel:${CONTACTS.phone}`} iconLeft="phone">
            {CONTACTS.phoneDisplay}
          </Button>

          <MessengerBadges messengers={CONTACTS.messengers} />

          <p className="text-center text-text-muted">
            Будни с 10:00 до 19:00. {CONTACTS.city}, {CONTACTS.addressLine}.
          </p>
        </div>
      </Container>
    </Section>
  );
}
