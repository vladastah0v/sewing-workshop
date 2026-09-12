/**
 * Главная страница. Владелец файла: Агент 2.
 * Порядок секций зафиксирован контрактом (ТЗ п.5.1) — менять только по согласованию.
 */

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PriceTeaserSection } from '@/components/sections/PriceTeaserSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { MapSection } from '@/components/sections/MapSection';
import { CtaSection } from '@/components/sections/CtaSection';

import { ADVANTAGES } from '@/content/advantages';
import { CONTACTS } from '@/content/contacts';
import { FAQ } from '@/content/faq';
import { PORTFOLIO } from '@/content/portfolio';
import { PRICES } from '@/content/prices';
import { PROCESS_STEPS } from '@/content/process';
import { REVIEWS } from '@/content/reviews';
import { SERVICES } from '@/content/services';

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Ремонт и пошив одежды"
        subtitle="Подгоним по фигуре, отремонтируем и сошьём с нуля. Срок от 1 дня."
        highlights={['Срок от 1 дня', 'Гарантия 30 дней', 'Бесплатная примерка']}
        // TODO(заказчик): вернуть проп image, когда появится реальное фото
        // мастерской — /images/ui/hero-workshop.jpg (≈1280×960).
        // Пока пропа нет: HeroSection штатно рендерится без изображения.
        // Подставлять сюда текстуру-заглушку нельзя — это LCP главной, и alt
        // обещал бы то, чего на картинке нет.
        primaryCta={{ label: 'Оставить заявку', href: '#request' }}
        secondaryCta={{ label: 'Посмотреть цены', href: '/prices' }}
      />
      <ServicesSection services={SERVICES} moreHref="/services" />
      <AdvantagesSection items={ADVANTAGES} />
      <PortfolioSection items={PORTFOLIO} moreHref="/portfolio" />
      <ProcessSection steps={PROCESS_STEPS} />
      <PriceTeaserSection categories={PRICES} moreHref="/prices" />
      <ReviewsSection reviews={REVIEWS} moreHref="/reviews" />
      <FaqSection items={FAQ} />
      <MapSection contacts={CONTACTS} />
      <CtaSection
        id="request"
        title="Оставьте заявку"
        description="Перезвоним в течение 15 минут в рабочее время."
        source="footer"
      />
    </>
  );
}
