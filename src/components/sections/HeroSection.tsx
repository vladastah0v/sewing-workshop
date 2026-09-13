/**
 * HeroSection — первый экран главной. Владелец: Агент 2.
 * Единственный h1 страницы (ТЗ п.7.4). Изображение — LCP, отдаётся с priority.
 */

import Image from 'next/image';

import type { HeroSectionProps } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';

export function HeroSection({
  title,
  subtitle,
  highlights,
  image,
  primaryCta,
  secondaryCta,
  className,
  id,
}: HeroSectionProps) {
  return (
    <Section id={id} background="subtle" className={className}>
      {/* Вторая колонка появляется только вместе с изображением: иначе
          на десктопе половина экрана осталась бы пустой. */}
      <Container
        className={cn('grid items-center gap-10 lg:gap-16', image && 'lg:grid-cols-2')}
      >
        <div className="flex flex-col gap-6">
          <h1 className="font-heading text-4xl lg:text-5xl">{title}</h1>

          {subtitle && <p className="max-w-[52ch] text-lg text-text-muted">{subtitle}</p>}

          {highlights && highlights.length > 0 && (
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 font-medium">
                  <Icon name="check" size={20} className="shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              href={primaryCta.href}
              onClick={primaryCta.onClick}
              iconRight="arrow-right"
            >
              {primaryCta.label}
            </Button>

            {secondaryCta && (
              <Button
                size="lg"
                variant="secondary"
                href={secondaryCta.href}
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>

        {image && (
          <div
            className={cn(
              'overflow-hidden rounded-2xl border border-border bg-bg-muted shadow-md',
              'lg:justify-self-end',
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              // LCP главной: грузим без задержки и без ленивой загрузки (ТЗ п.7.2).
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder={image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={image.blurDataURL}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
