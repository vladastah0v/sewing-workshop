/**
 * /reviews — отзывы клиентов (ТЗ п.5.7). Владелец файла: Агент 3.
 *
 * Выводятся только approved: true — неодобренные лежат в том же массиве
 * и на страницу не попадают. Микроразметка Review + AggregateRating идёт одним
 * JSON-LD (см. src/content/seo.ts), в карточках её нет — иначе отзывы задвоятся.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Rating } from '@/components/ui/Rating';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReviewCard } from '@/components/features/ReviewCard';
import { ReviewForm } from '@/components/forms/ReviewForm';
import { CONTACTS } from '@/content/contacts';
import { APPROVED_REVIEWS, getAverageRating } from '@/content/reviews';
import { jsonLdScriptProps, reviewsPageJsonLd } from '@/content/seo';

export const metadata: Metadata = {
  title: 'Отзывы клиентов о швейной мастерской',
  description:
    'Что пишут клиенты о ремонте, подгонке и пошиве одежды: сроки, качество швов, ' +
    'работа с кожей и свадебными нарядами. Отзывы с сайта, Яндекс.Карт и 2ГИС.',
  alternates: { canonical: '/reviews' },
};

/** «12 отзывов» / «2 отзыва» / «1 отзыв». */
function reviewsWord(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'отзыв';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'отзыва';
  return 'отзывов';
}

export default function ReviewsPage() {
  const reviews = APPROVED_REVIEWS;
  const average = getAverageRating(reviews);

  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Отзывы' }]} />
      </Container>

      <Section spacing="sm">
        <Container>
          <SectionHeading
            level={1}
            eyebrow="Отзывы"
            title="Что говорят клиенты"
            subtitle="Публикуем все отзывы после короткой модерации — она отсекает спам, а не критику."
          />

          {reviews.length > 0 && (
            <div className="mb-10 flex flex-wrap items-center gap-4 rounded-xl bg-accent-subtle px-6 py-5">
              <span className="font-heading text-4xl">{average.toFixed(1)}</span>
              <div className="flex flex-col gap-1">
                <Rating value={average} />
                <p className="text-text-muted">
                  {reviews.length} {reviewsWord(reviews.length)} за последний год
                </p>
              </div>
            </div>
          )}

          {reviews.length === 0 ? (
            <EmptyState
              iconName="quote"
              title="Отзывов пока нет"
              description="Мы только начали собирать их на сайте. Если вы уже были у нас — расскажите, как всё прошло."
              action={{ label: 'Оставить отзыв', href: '#review-form' }}
            />
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <li key={review.id} className="flex">
                  <ReviewCard review={review} className="w-full" />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <Section id="review-form" background="subtle">
        <Container width="narrow">
          <SectionHeading
            align="center"
            title="Оставить отзыв"
            subtitle="Отзыв появится на сайте после модерации — обычно в течение рабочего дня."
          />
          <ReviewForm />
        </Container>
      </Section>

      <script {...jsonLdScriptProps(reviewsPageJsonLd(reviews, average, CONTACTS))} />
    </>
  );
}
