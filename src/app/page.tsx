/**
 * Главная страница. Владелец файла: Агент 2.
 *
 * Состав секций сокращён решением заказчика от 13.09.2026: убраны
 * «Как мы работаем», «Отзывы» и блок заявки. Единственный канал обращения —
 * телефон. Номер выводится текстом и не кликается (решение от 14.09.2026),
 * поэтому кнопки первого экрана ведут на контакты и цены.
 */

import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { PriceTeaserSection } from '@/components/sections/PriceTeaserSection';
import { MapSection } from '@/components/sections/MapSection';

import { CONTACTS } from '@/content/contacts';
import { PORTFOLIO } from '@/content/portfolio';
import { PRICES } from '@/content/prices';
import { SERVICES } from '@/content/services';

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Ремонт и пошив одежды"
        // TODO(заказчик): вернуть проп image, когда появится реальное фото
        // мастерской — /images/ui/hero-workshop.jpg (≈1280×960).
        // Пока пропа нет: HeroSection штатно рендерится без изображения.
        primaryCta={{ label: 'Как нас найти', href: '/contacts' }}
        secondaryCta={{ label: 'Посмотреть цены', href: '/prices' }}
      />
      <ServicesSection services={SERVICES} moreHref="/services" />
      <PortfolioSection items={PORTFOLIO} moreHref="/portfolio" />
      <PriceTeaserSection categories={PRICES} moreHref="/prices" />
      <MapSection contacts={CONTACTS} id="contacts" />
    </>
  );
}
