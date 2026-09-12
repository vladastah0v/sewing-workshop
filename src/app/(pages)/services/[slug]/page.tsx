/**
 * /services/[slug] — детальная страница услуги (ТЗ п.5.2). Владелец файла: Агент 3.
 *
 * Статическая генерация: услуг конечное число, generateStaticParams отдаёт все ЧПУ,
 * dynamicParams выключен — неизвестный slug даёт честную 404, а не пустую страницу.
 */

import type { Metadata } from 'next';
import type { PriceGroup, ServiceSlug } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioGallery } from '@/components/features/PortfolioGallery';
import { PriceTable } from '@/components/features/PriceTable';
import { ProcessSteps } from '@/components/features/ProcessSteps';
import { ServiceGrid } from '@/components/features/ServiceGrid';
import { RequestForm } from '@/components/forms/RequestForm';
import { CONTACTS } from '@/content/contacts';
import { PORTFOLIO } from '@/content/portfolio';
import { PRICES } from '@/content/prices';
import { PROCESS_STEPS } from '@/content/process';
import { SERVICES, getServiceBySlug } from '@/content/services';
import { jsonLdScriptProps, serviceJsonLd } from '@/content/seo';
import { formatLeadTime, formatPrice } from '@/lib/utils';

export const dynamicParams = false;

/**
 * Какие группы прайса показывать на странице услуги.
 * Весь прайс целиком здесь лишний: на «Реставрации» не нужны шторы,
 * а на «Пошиве» — замена молнии в куртке.
 */
const PRICE_GROUPS_BY_SERVICE: Record<ServiceSlug, PriceGroup[]> = {
  repair: ['women', 'men', 'outerwear', 'knitwear'],
  tailoring: ['women', 'men', 'home-textile'],
  'custom-fit': ['women', 'men'],
  restoration: ['leather-fur', 'wedding', 'outerwear'],
  other: ['women', 'men', 'outerwear', 'knitwear', 'leather-fur', 'wedding', 'home-textile'],
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const canonical = service.seo?.canonicalPath ?? `/services/${service.slug}`;

  return {
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.shortDescription,
    alternates: { canonical },
    openGraph: {
      title: service.seo?.title ?? service.title,
      description: service.seo?.description ?? service.shortDescription,
      url: canonical,
      ...(service.image ? { images: [{ url: service.image.src }] } : {}),
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Работы и цены этой же категории: пустые блоки не выводим.
  const relatedWork = PORTFOLIO.filter((item) => item.category === service.category);
  const relatedPrices = PRICES.filter((category) =>
    PRICE_GROUPS_BY_SERVICE[service.category].includes(category.group),
  );
  const otherServices = SERVICES.filter((item) => item.id !== service.id);

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Услуги', href: '/services' },
            { label: service.title },
          ]}
        />
      </Container>

      <Section spacing="sm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <SectionHeading
                level={1}
                eyebrow="Услуга"
                title={service.title}
                subtitle={service.shortDescription}
                className="mb-0 lg:mb-0"
              />

              <dl className="flex flex-wrap gap-x-10 gap-y-4">
                <div className="flex flex-col gap-1">
                  <dt className="text-sm text-text-muted">Стоимость</dt>
                  <dd className="font-heading text-2xl">
                    {service.priceFrom === null ? 'по замерам' : `от ${formatPrice(service.priceFrom)}`}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm text-text-muted">Срок</dt>
                  <dd className="font-heading text-2xl">{formatLeadTime(service.leadTimeDays)}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm text-text-muted">Гарантия</dt>
                  <dd className="font-heading text-2xl">30 дней</dd>
                </div>
              </dl>

              {service.description && (
                <p className="text-lg text-text-muted">{service.description}</p>
              )}

              {service.popular && <Badge tone="accent">Чаще всего заказывают</Badge>}
            </div>

            {service.image && (
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="w-full rounded-xl border border-border object-cover"
              />
            )}
          </div>
        </Container>
      </Section>

      <Section background="subtle">
        <Container>
          <SectionHeading title="Как проходит работа" />
          <ProcessSteps steps={PROCESS_STEPS} />
        </Container>
      </Section>

      {relatedWork.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              title="Примеры работ"
              subtitle="Фотографии сделаны в мастерской, до и после."
              action={{ label: 'Все работы', href: '/portfolio' }}
            />
            <PortfolioGallery items={relatedWork} showFilters={false} columns={3} />
          </Container>
        </Section>
      )}

      <Section background="subtle">
        <Container>
          <SectionHeading
            title="Цены"
            subtitle="Ориентир по прайсу. Точную сумму мастер называет после осмотра изделия."
            action={{ label: 'Весь прайс', href: '/prices' }}
          />
          <PriceTable categories={relatedPrices} />
        </Container>
      </Section>

      <Section id="request">
        <Container width="narrow">
          <SectionHeading
            align="center"
            title={`Оставьте заявку: ${service.title.toLowerCase()}`}
            subtitle={`Перезвоним в течение 15 минут в рабочее время — ${CONTACTS.phoneDisplay}.`}
          />
          <RequestForm variant="full" source="service-page" defaultServiceType={service.category} />
        </Container>
      </Section>

      {otherServices.length > 0 && (
        <Section background="subtle">
          <Container>
            <SectionHeading title="Другие услуги" />
            <ServiceGrid services={otherServices} columns={3} />
          </Container>
        </Section>
      )}

      <script {...jsonLdScriptProps(serviceJsonLd(service, CONTACTS))} />
    </>
  );
}
