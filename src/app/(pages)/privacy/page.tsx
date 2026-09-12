/**
 * /privacy — политика обработки персональных данных (152-ФЗ). Владелец файла: Агент 3.
 *
 * ВАЖНО: это рабочий шаблон, а не согласованный юридический текст.
 * Реквизиты оператора (юрлицо, ИНН, ОГРН, юридический адрес) — открытый вопрос №6
 * в docs/CONTRACTS.md. До ответа заказчика места под реквизиты помечены явно,
 * чтобы никто не принял заглушку за настоящие данные.
 *
 * Ссылка сюда стоит в ConsentCheckbox (policyHref по умолчанию '/privacy')
 * и в подвале — путь менять нельзя без согласования с Агентом 1 и Агентом 4.
 */

import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACTS } from '@/content/contacts';
import { FORM_LIMITS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description:
    'Какие данные мы собираем через формы сайта, зачем они нужны, сколько хранятся ' +
    'и как отозвать согласие на их обработку.',
  alternates: { canonical: '/privacy' },
};

/** Дата последнего пересмотра текста политики. */
const UPDATED_AT = '2026-09-12';

export default function PrivacyPage() {
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
            subtitle={`Редакция от ${new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(UPDATED_AT))}.`}
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
              <p>
                Отправляя форму на сайте, вы подтверждаете, что ознакомились с этой политикой
                и даёте согласие на обработку указанных в форме данных на условиях ниже.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">2. Какие данные мы собираем</h2>
              <p>Через формы сайта оператор получает только то, что вы ввели сами:</p>
              <ul className="flex list-disc flex-col gap-2 pl-6">
                <li>имя — чтобы знать, как к вам обращаться;</li>
                <li>номер телефона — чтобы перезвонить по заявке;</li>
                <li>
                  выбранную услугу, комментарий и удобное время связи — чтобы подготовиться
                  к разговору;
                </li>
                <li>
                  фотографии изделия, если вы их прикрепили — не более{' '}
                  {FORM_LIMITS.attachmentsMax} файлов;
                </li>
                <li>текст и оценку в отзыве, если вы его оставили.</li>
              </ul>
              <p>
                Автоматически собираются обезличенные данные веб-аналитики: IP-адрес, тип
                браузера и устройства, источник перехода, действия на страницах. Они нужны,
                чтобы понимать, как работает сайт, и не позволяют установить личность.
              </p>
              <p>
                Оператор не собирает специальные категории персональных данных и биометрию
                и не запрашивает паспортные или платёжные данные через сайт.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">3. Зачем они нужны</h2>
              <ul className="flex list-disc flex-col gap-2 pl-6">
                <li>связаться с вами по оставленной заявке и согласовать работу;</li>
                <li>оказать услугу и выполнить обязательства по заказу;</li>
                <li>опубликовать отзыв после модерации, если вы его отправили;</li>
                <li>улучшать сайт на основе обезличенной статистики.</li>
              </ul>
              <p>
                Рекламные рассылки по оставленному номеру не отправляются — только ответ
                по вашему обращению.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">4. Кому передаются данные</h2>
              <p>
                Данные не продаются и не передаются третьим лицам, за исключением сервисов,
                без которых сайт не работает: хостинг, сервис уведомлений о новых заявках
                и системы веб-аналитики. Каждый из них обрабатывает данные по поручению
                оператора и в том же объёме.
              </p>
              <p>
                Передача государственным органам возможна только по основаниям, прямо
                предусмотренным законом.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">5. Сколько хранятся</h2>
              <p>
                Данные заявки хранятся до выполнения заказа и в течение срока гарантии,
                после чего удаляются. Текст опубликованного отзыва хранится, пока он размещён
                на сайте. Обезличенная статистика хранится в сервисах аналитики по их правилам.
              </p>
              <p>
                Вы можете потребовать удалить данные раньше — см. раздел 7.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">6. Как мы их защищаем</h2>
              <p>
                Сайт работает по HTTPS, доступ к заявкам есть только у сотрудников мастерской,
                которым он нужен для работы. Формы защищены от автоматических отправок
                без ввода капчи. Полностью исключить риски при передаче данных через интернет
                невозможно, но оператор принимает разумные организационные и технические меры.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">7. Ваши права</h2>
              <p>Вы вправе в любой момент:</p>
              <ul className="flex list-disc flex-col gap-2 pl-6">
                <li>узнать, какие ваши данные обрабатываются;</li>
                <li>потребовать уточнить, заблокировать или удалить их;</li>
                <li>отозвать согласие на обработку.</li>
              </ul>
              <p>
                Для этого напишите на{' '}
                <a href={`mailto:${CONTACTS.email}`} className="font-semibold text-text-link hover:text-accent-active">
                  {CONTACTS.email}
                </a>{' '}
                или позвоните по телефону{' '}
                <a href={`tel:${CONTACTS.phone}`} className="font-semibold text-text-link hover:text-accent-active">
                  {CONTACTS.phoneDisplay}
                </a>
                . Запрос рассматривается в течение 30 дней. После отзыва согласия мы удалим
                данные, если нет законных оснований хранить их дольше.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">8. Файлы cookie</h2>
              <p>
                Сайт использует cookie для работы веб-аналитики и запоминания настроек
                интерфейса. Их можно отключить в настройках браузера — на основные функции
                сайта это не повлияет.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl text-text">9. Изменения политики</h2>
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
