/**
 * /privacy — политика обработки персональных данных (152-ФЗ). Владелец файла: Агент 3.
 *
 * ВАЖНО: это рабочий шаблон, а не согласованный юридический текст.
 * Реквизиты оператора (юрлицо, ИНН, ОГРН) — открытый вопрос в docs/CONTRACTS.md.
 *
 * Текст переписан 14.09.2026 под фактическое состояние сайта: форм обратной
 * связи нет, счётчиков аналитики нет, персональные данные сайт не собирает.
 * Единственный сторонний обработчик — виджет Яндекс.Карт на странице контактов.
 * Если на сайт вернут формы или подключат Метрику — политику надо обновить,
 * иначе она снова разойдётся с реальностью.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACTS } from '@/content/contacts';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description:
    'Сайт мастерской не собирает персональные данные: форм обратной связи нет. ' +
    'Что происходит с данными при звонке или письме и как отозвать согласие.',
  alternates: { canonical: '/privacy' },
};

/** Дата последнего пересмотра текста политики. */
const UPDATED_AT = '2026-09-14';

export default function PrivacyPage() {
  const updated = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(UPDATED_AT));

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[{ label: 'Главная', href: '/' }, { label: 'Политика конфиденциальности' }]}
        />
      </Container>

      <Section spacing="sm">
        <Container width="narrow">
          <SectionHeading
            level={1}
            title="Политика обработки персональных данных"
            subtitle={`Редакция от ${updated}.`}
          />

          <div className="flex flex-col gap-8 text-text-muted">
            <p className="rounded-lg border border-warning/40 bg-warning/10 px-5 py-4 text-text">
              <strong className="font-semibold">Черновик.</strong> Реквизиты оператора
              и юридический адрес ещё не переданы заказчиком. Перед публикацией сайта текст
              должен быть проверен юристом и дополнен реальными данными — места отмечены
              как «реквизиты уточняются».
            </p>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">1. Общие положения</h2>
              <p>
                Политика определяет порядок обработки персональных данных посетителей сайта
                и составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
                «О персональных данных».
              </p>
              <p>
                Оператор персональных данных —{' '}
                {CONTACTS.legalEntity ? (
                  <>
                    {CONTACTS.legalEntity.name}, ИНН {CONTACTS.legalEntity.inn}, ОГРН{' '}
                    {CONTACTS.legalEntity.ogrn}
                  </>
                ) : (
                  <>
                    {CONTACTS.organizationName}
                    <span className="text-text-subtle"> (реквизиты уточняются)</span>
                  </>
                )}
                , адрес:{' '}
                {CONTACTS.legalEntity?.legalAddress ??
                  `${CONTACTS.city}, ${CONTACTS.addressLine}`}
                .
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">
                2. Сайт не собирает персональные данные
              </h2>
              <p>
                На сайте нет форм обратной связи, регистрации, онлайн-записи и приёма отзывов.
                Сайт не запрашивает имя, телефон, адрес электронной почты и не принимает
                вложенные файлы. Ничего не отправляется оператору автоматически.
              </p>
              <p>
                Счётчики веб-аналитики на сайте не установлены, собственные cookie сайт
                не записывает. Если аналитику подключат, эта политика будет обновлена
                до её запуска.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">
                3. Когда данные всё-таки появляются
              </h2>
              <p>
                Данные попадают к оператору только если вы обратитесь сами — позвоните
                по указанному номеру или напишете на почту. В этом случае обрабатываются:
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-6">
                <li>номер телефона или адрес почты, с которого вы обратились;</li>
                <li>имя, если вы его назвали;</li>
                <li>содержание обращения: что за изделие и какая нужна работа.</li>
              </ul>
              <p>
                Эти данные нужны, чтобы ответить вам, согласовать работу и выполнить заказ.
                Рекламные рассылки не отправляются. Данные хранятся до выполнения заказа
                и в течение срока гарантии, после чего удаляются.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">4. Сторонние сервисы</h2>
              <p>
                На странице контактов встроен виджет Яндекс.Карт. Он загружается
                с серверов Яндекса и может записывать свои cookie и получать технические
                данные вашего браузера: IP-адрес, тип устройства, страницу перехода.
                Оператор к этим данным доступа не имеет, они обрабатываются по правилам
                Яндекса.
              </p>
              <p>
                Виджет можно заблокировать расширением браузера или запретом сторонних
                cookie — на остальные страницы сайта это не повлияет. Адрес и схема проезда
                продублированы текстом.
              </p>
              <p>
                Сайт размещён на хостинге, который ведёт технические журналы обращений.
                Иным третьим лицам данные не передаются и не продаются. Передача
                государственным органам возможна только по основаниям, прямо
                предусмотренным законом.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">5. Защита данных</h2>
              <p>
                Сайт работает по HTTPS. Доступ к обращениям есть только у сотрудников
                мастерской, которым он нужен для работы. Полностью исключить риски
                при передаче данных через интернет невозможно, но оператор принимает
                разумные организационные и технические меры.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">6. Ваши права</h2>
              <p>Вы вправе в любой момент:</p>
              <ul className="flex list-disc flex-col gap-2 pl-6">
                <li>узнать, какие ваши данные обрабатываются;</li>
                <li>потребовать уточнить, заблокировать или удалить их;</li>
                <li>отозвать согласие на обработку.</li>
              </ul>
              <p>
                Для этого напишите на{' '}
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="font-semibold text-text-link hover:text-accent-active"
                >
                  {CONTACTS.email}
                </a>{' '}
                или позвоните по телефону{' '}
                <span className="font-semibold text-text select-all">
                  {CONTACTS.phoneDisplay}
                </span>
                . Запрос рассматривается в течение 30 дней. После отзыва согласия мы удалим
                данные, если нет законных оснований хранить их дольше.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">7. Изменения политики</h2>
              <p>
                Оператор может обновлять политику. Действующая редакция всегда опубликована
                на этой странице, дата редакции указана в начале.
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
