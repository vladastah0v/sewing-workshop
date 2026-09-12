/**
 * /about — о мастерской (ТЗ п.4.6). Владелец файла: Агент 3.
 * Здесь же LocalBusiness: страница «О нас» — каноничное место для разметки организации.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactInfo } from '@/components/features/ContactInfo';
import { MasterCard } from '@/components/features/MasterCard';
import { ReviewSlider } from '@/components/features/ReviewSlider';
import { RequestForm } from '@/components/forms/RequestForm';
import { ADVANTAGES } from '@/content/advantages';
import { CONTACTS } from '@/content/contacts';
import { MASTERS } from '@/content/masters';
import { APPROVED_REVIEWS } from '@/content/reviews';
import { jsonLdScriptProps, localBusinessJsonLd } from '@/content/seo';

export const metadata: Metadata = {
  title: 'О мастерской: команда, опыт и оборудование',
  description:
    'Швейная мастерская в Москве: три мастера, суммарно 45 лет опыта, промышленное ' +
    'оборудование для трикотажа, кожи и меха. Как мы работаем и за что отвечаем.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const totalExperience = MASTERS.reduce((sum, master) => sum + master.experienceYears, 0);

  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'О мастерской' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="О нас"
            title="Мастерская, в которую возвращаются"
            subtitle="Мы небольшие: три мастера, один из них — закройщик-конструктор. Поэтому каждую вещь ведёт конкретный человек, а не «ателье вообще»."
          />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div className="flex flex-col gap-4 text-lg text-text-muted">
              <p>
                Мастерская работает с 2011 года. Начинали с ремонта и подгонки, потом добавили
                пошив по индивидуальным меркам — клиенты с нестандартной фигурой приходили
                снова и снова, и стало понятно, что подгонкой магазинных вещей задача не решается.
              </p>
              <p>
                Сегодня у нас четыре промышленные машины, включая плоскошовную для трикотажа и
                рукавную для кожи. Это не роскошь, а разница между «зашили» и «не видно, что чинили»:
                бытовая машина не даёт нужного шва на плотных материалах.
              </p>
              <p>
                Мы не берёмся за работу, в которой не уверены. Если вещь не спасти — скажем сразу
                и не станем брать деньги за попытку.
              </p>
            </div>

            <Card className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-4xl text-accent">{totalExperience} лет</span>
                <span className="text-text-muted">суммарный опыт мастеров</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-4xl text-accent">30 дней</span>
                <span className="text-text-muted">гарантия на любую работу</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-4xl text-accent">от 1 дня</span>
                <span className="text-text-muted">срок простого ремонта</span>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="subtle">
        <Container>
          <SectionHeading title="Почему к нам приходят" />
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((advantage) => (
              <Card as="li" key={advantage.id} className="flex flex-col gap-3">
                <span className="grid size-12 place-items-center rounded-lg bg-accent-subtle text-brand-700">
                  <Icon name={advantage.iconName ?? 'check'} size={24} />
                </span>
                <h3 className="font-heading text-xl">{advantage.title}</h3>
                <p className="text-text-muted">{advantage.description}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            title="Кто будет шить"
            subtitle="Имя мастера, который ведёт ваш заказ, вы узнаете при первом визите."
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MASTERS.map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </ul>
        </Container>
      </Section>

      {APPROVED_REVIEWS.length > 0 && (
        <Section background="subtle">
          <Container>
            <SectionHeading
              title="Отзывы клиентов"
              action={{ label: 'Все отзывы', href: '/reviews' }}
            />
            <ReviewSlider reviews={APPROVED_REVIEWS} slidesPerView={3} />
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-6">
              <SectionHeading
                title="Как нас найти"
                subtitle="Заходите без записи — но с ней не придётся ждать мастера."
                className="mb-0 lg:mb-0"
              />
              <ContactInfo contacts={CONTACTS} />
            </div>

            <div className="flex flex-col gap-6" id="request">
              <SectionHeading title="Написать нам" className="mb-0 lg:mb-0" />
              <RequestForm variant="full" source="contacts" />
            </div>
          </div>
        </Container>
      </Section>

      <script {...jsonLdScriptProps(localBusinessJsonLd(CONTACTS))} />
    </>
  );
}
