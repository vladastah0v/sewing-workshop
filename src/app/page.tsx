/**
 * Главная страница. Владелец файла: Агент 2.
 *
 * Состав секций сокращён решением заказчика от 13.09.2026: убраны
 * «Как мы работаем», «Отзывы» и блок заявки. Единственный канал обращения —
 * телефон, поэтому и hero, и шапка, и липкая кнопка ведут на tel:,
 * а закрывает страницу блок контактов с картой.
 */

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { PriceTeaserSection } from '@/components/sections/PriceTeaserSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { MapSection } from '@/components/sections/MapSection';

import { ADVANTAGES } from '@/content/advantages';
import { CONTACTS } from '@/content/contacts';
import { FAQ } from '@/content/faq';
import { PORTFOLIO } from '@/content/portfolio';
import { PRICES } from '@/content/prices';
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
        primaryCta={{ label: CONTACTS.phoneDisplay, href: `tel:${CONTACTS.phone}` }}
        secondaryCta={{ label: 'Посмотреть цены', href: '/prices' }}
      />
      <ServicesSection services={SERVICES} moreHref="/services" />
      <AdvantagesSection items={ADVANTAGES} />
      <PortfolioSection items={PORTFOLIO} moreHref="/portfolio" />
      <PriceTeaserSection categories={PRICES} moreHref="/prices" />
      <FaqSection items={FAQ} />
      <MapSection contacts={CONTACTS} id="contacts" />
    </>
  );
}
