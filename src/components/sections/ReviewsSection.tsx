/**
 * ReviewsSection — отзывы на главной (ТЗ п.5.7). Владелец: Агент 2.
 * Слайдер — ReviewSlider (Агент 3). Секция считает средний балл и отдаёт
 * микроразметку AggregateRating.
 */

import type { Review, ReviewsSectionProps } from '@/types';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReviewSlider } from '@/components/features/ReviewSlider';

function averageOf(reviews: Review[]): number {
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function ReviewsSection({
  reviews,
  heading = 'Отзывы клиентов',
  moreHref,
  averageRating,
  className,
  id,
}: ReviewsSectionProps) {
  // На сайт выводятся только прошедшие модерацию (контракт, поле approved).
  const published = reviews.filter((review) => review.approved);
  const rating = averageRating ?? (published.length > 0 ? averageOf(published) : undefined);

  const jsonLd =
    rating !== undefined && published.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: SITE_NAME,
          url: SITE_URL,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating,
            reviewCount: published.length,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : null;

  return (
    <Section id={id} background="subtle" className={className}>
      <Container>
        <SectionHeading
          eyebrow="Отзывы"
          title={heading}
          subtitle={
            rating !== undefined
              ? `Средняя оценка ${rating.toFixed(1)} из 5 по ${published.length} отзывам`
              : undefined
          }
          action={moreHref ? { label: 'Все отзывы', href: moreHref } : undefined}
        />

        {published.length > 0 ? (
          <ReviewSlider reviews={published} slidesPerView={3} />
        ) : (
          <EmptyState
            iconName="quote"
            title="Отзывов пока нет"
            description="Станьте первым: расскажите, как прошла работа."
            action={moreHref ? { label: 'Оставить отзыв', href: moreHref } : undefined}
          />
        )}
      </Container>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Section>
  );
}
