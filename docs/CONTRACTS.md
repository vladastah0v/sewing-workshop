# Контракты проекта «Сайт швейной мастерской»

Единый источник правды для всех исполнителей. Зафиксирован **до** начала разработки.
Основание: `ТЗ_сайт_швейная_мастерская.md`.

> **Главное правило.** Всё, что описано в этом файле, менять в одиночку нельзя.
> Нужна правка контракта — сначала правишь этот документ и предупреждаешь остальных,
> потом код. Обратный порядок ломает параллельную работу.

---

## 1. Стек и версии

| Что | Решение | Почему |
|---|---|---|
| Фреймворк | Next.js 15, App Router, TypeScript strict | SSG/ISR, метатеги, sitemap, Schema.org — требования ТЗ п.7.4 из коробки |
| Стили | Tailwind CSS v4 поверх CSS-переменных | токены — единственный источник значений, агенты не правят чужие CSS-файлы |
| Шрифты | `next/font/google`: Playfair Display (заголовки) + Manrope (текст) | кириллица, ноль внешних запросов, нет CLS |
| Формы | собственные API-routes | `POST /api/leads` → уведомление в Telegram |
| Данные | статические модули в `src/content/` | позже заменяются на CMS без правки компонентов |
| Валидация | `src/lib/validation.ts`, без зависимостей | один код на клиенте и на сервере |

Требование к окружению: **Node.js ≥ 20.9**.

---

## 2. Структура папок и зоны ответственности

Каждый файл имеет ровно одного владельца. Чужие файлы читаем, но не редактируем.

```
project3.0/
├── docs/
│   └── CONTRACTS.md            ← этот файл. Правится по согласованию всех
├── public/
│   └── images/                 ← общая, но подпапки по владельцам:
│       ├── portfolio/          ← Агент 3
│       ├── services/           ← Агент 3
│       └── ui/                 ← Агент 1
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← АГЕНТ 1
│   │   ├── globals.css         ← АГЕНТ 1
│   │   ├── page.tsx            ← АГЕНТ 2 (главная)
│   │   ├── (pages)/…           ← АГЕНТ 3 (внутренние страницы)
│   │   └── api/                ← АГЕНТ 4
│   ├── styles/
│   │   └── tokens.css          ← АГЕНТ 1
│   ├── types/                  ← АГЕНТ 1 (общий контракт, все читают)
│   │   ├── content.ts          модели данных
│   │   ├── api.ts              запросы/ответы API
│   │   ├── ui.ts               пропсы компонентов
│   │   └── index.ts            точка импорта: import type {…} from '@/types'
│   ├── lib/
│   │   ├── constants.ts        ← АГЕНТ 1
│   │   ├── utils.ts            ← АГЕНТ 1
│   │   ├── validation.ts       ← АГЕНТ 4
│   │   ├── api-client.ts       ← АГЕНТ 4
│   │   ├── analytics.ts        ← АГЕНТ 4
│   │   └── notify.ts           ← АГЕНТ 4
│   ├── content/                ← АГЕНТ 3 (данные-заглушки → CMS)
│   └── components/
│       ├── ui/                 ← АГЕНТ 1  (примитивы)
│       ├── layout/             ← АГЕНТ 1  (шапка, подвал, sticky)
│       ├── sections/           ← АГЕНТ 2  (секции главной)
│       ├── features/           ← АГЕНТ 3  (карточки, галереи, прайс, карта)
│       └── forms/              ← АГЕНТ 4  (формы)
└── tmp/plans/                  локальные копии планов, в git не идёт
```

### Границы: кто что делает

```
        ┌──────────────────────────────────────────────────┐
        │  КОНТРАКТ (src/types, src/styles, src/lib/const)  │
        │       фиксирован до старта, читают все           │
        └───────┬──────────┬───────────┬──────────┬────────┘
                │          │           │          │
         ┌──────▼───┐ ┌────▼─────┐ ┌───▼──────┐ ┌─▼────────┐
         │ АГЕНТ 1  │ │ АГЕНТ 2  │ │ АГЕНТ 3  │ │ АГЕНТ 4  │
         │  ядро    │ │  главная │ │ страницы │ │  формы   │
         │ ui/      │ │ sections/│ │ features/│ │ forms/   │
         │ layout/  │ │ page.tsx │ │ content/ │ │ api/     │
         │ tokens   │ │          │ │ (pages)/ │ │ lib/*    │
         └──────────┘ └──────────┘ └──────────┘ └──────────┘
              ▲            │            │            │
              └────────────┴────────────┴────────────┘
                 все импортируют примитивы Агента 1
```

Зависимости строго в одну сторону: `ui` ← `features`/`sections`/`forms` ← страницы.
Примитив никогда не импортирует фичу. Секция не импортирует другую секцию.

---

## 3. Design tokens

Значения живут в [src/styles/tokens.css](../src/styles/tokens.css) и пробрасываются
в Tailwind через `@theme` в [src/app/globals.css](../src/app/globals.css).

**Запрещено в компонентах:** сырые `#hex`, произвольные `px` в отступах,
`font-family` мимо токенов, `z-index` числом. Только классы/переменные из списка ниже.

### 3.1 Цвета

Бренд — тёплая терракота: «ремесленность и аккуратность» из ТЗ п.6.1.

| Токен | Значение | Где применять |
|---|---|---|
| `--color-brand-600` | `#b45a31` | фон основной кнопки (контраст с белым **4.72:1**, AA ✓) |
| `--color-brand-700` | `#94472a` | hover кнопки, цвет текстовых ссылок |
| `--color-brand-50` | `#fdf6f1` | мягкая подложка акцентных блоков |
| `--color-neutral-800` | `#38322c` | основной текст (12.6:1 на белом) |
| `--color-neutral-600` | `#6a6055` | вторичный текст (6.2:1) |
| `--color-neutral-500` | `#857a6c` | подписи, 4.2:1 — **только крупный текст**, не для body |
| `--color-neutral-200` | `#e4ded6` | границы |
| `--color-neutral-50` | `#faf8f5` | фон чередующихся секций |

Полные шкалы 50–900 для brand и neutral — в `tokens.css`.

**Ролевые токены — в разметке использовать именно их, а не шкалы:**
`--color-bg`, `--color-bg-subtle`, `--color-bg-muted`, `--color-bg-inverse`,
`--color-surface`, `--color-border`, `--color-border-strong`,
`--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-text-inverse`, `--color-text-link`,
`--color-accent`, `--color-accent-hover`, `--color-accent-active`, `--color-accent-subtle`, `--color-on-accent`,
`--color-success`, `--color-warning`, `--color-error`, `--color-info`.

Причина: перекраска сайта под брендбук заказчика (ТЗ п.6.5, п.12) должна сводиться
к правке одного файла.

### 3.2 Типографика

Пара: **Playfair Display** (заголовки, `--font-heading`) + **Manrope** (текст, `--font-body`).

| Токен | rem | px | Назначение |
|---|---|---|---|
| `--text-xs` | 0.8125 | 13 | бейджи, подписи — **не для body** |
| `--text-sm` | 0.875 | 14 | подписи полей |
| `--text-base` | 1 | 16 | основной текст — минимум по ТЗ п.6.4 |
| `--text-lg` | 1.125 | 18 | лид-абзац |
| `--text-xl` | 1.375 | 22 | h4 |
| `--text-2xl` | 1.75 | 28 | h3 |
| `--text-3xl` | 2.25 | 36 | h2 |
| `--text-4xl` | 3 | 48 | h1 мобайл |
| `--text-5xl` | 3.75 | 60 | h1 десктоп |

Межстрочные: `--leading-tight` 1.15 (заголовки), `--leading-normal` 1.6 (текст).
Начертания: 400 / 500 / 600 / 700.

### 3.3 Отступы — сетка 8pt

| Токен | px | | Токен | px |
|---|---|---|---|---|
| `--space-1` | 4 | | `--space-7` | 40 |
| `--space-2` | 8 | | `--space-8` | 48 |
| `--space-3` | 12 | | `--space-9` | 64 |
| `--space-4` | 16 | | `--space-10` | 80 |
| `--space-5` | 24 | | `--space-11` | 96 |
| `--space-6` | 32 | | `--space-12` | 128 |

Вертикальный ритм секций: `--section-py` 48px (мобайл) → `--section-py-lg` 96px (от `lg`).
Боковые поля: `--container-gutter` = 16px минимум на любой ширине.

### 3.4 Брейкпоинты

| Имя | От | Комментарий |
|---|---|---|
| base | 320px | mobile-first, без префикса |
| `sm` | 480px | крупный телефон |
| `md` | 768px | планшет, 2 колонки |
| `lg` | 1024px | десктоп, 3 колонки, боковое меню |
| `xl` | 1280px | контейнер выходит на максимум |
| `2xl` | 1536px | — |

Поддержка до 2560px: контент упирается в `--container-max` (1280px), фоны тянутся на всю ширину.
Значения продублированы в JS: `BREAKPOINTS` в `src/lib/constants.ts` (для `matchMedia`).

### 3.5 Остальное

- Радиусы: `sm` 4, `md` 8, `lg` 12, `xl` 16, `2xl` 24, `full`.
- Тени: `xs`/`sm`/`md`/`lg` + `--shadow-focus`.
- Размеры контролов: `--tap-target-min` **44px** (ТЗ п.6.3), высоты 36/44/52.
- Анимации: 120/220/400 мс, `--ease-standard`. Уважаем `prefers-reduced-motion` (уже в `globals.css`).
- **z-index — только из шкалы:** sticky-cta 30 → header 40 → dropdown 50 → backdrop 60 → modal 70 → lightbox 80 → toast 90.

---

## 4. Правила именования

| Сущность | Правило | Пример |
|---|---|---|
| Файл компонента | `PascalCase.tsx`, один компонент на файл | `ServiceCard.tsx` |
| Экспорт компонента | **именованный**, имя = имя файла | `export function ServiceCard` |
| Исключение | `page.tsx`, `layout.tsx`, `route.ts` — `export default` (требование Next.js) | |
| Тип пропсов | `ИмяКомпонентаProps`, объявлен в `src/types/ui.ts` | `ServiceCardProps` |
| Хук | `useCamelCase.ts` | `useMediaQuery.ts` |
| Утилита | `camelCase` в `src/lib/` | `formatPrice` |
| Константа | `SCREAMING_SNAKE_CASE` | `FORM_LIMITS` |
| Данные-контент | `SCREAMING_SNAKE_CASE` в `src/content/` | `SERVICES` |
| CSS-токен | `--категория-имя-оттенок` | `--color-brand-600` |
| Импорт внутри проекта | всегда алиас `@/`, никаких `../../` | `import { Button } from '@/components/ui/Button'` |
| Импорт типов | всегда из барреля `@/types` | `import type { ServiceCardProps } from '@/types'` |

Директива `'use client'` — только там, где реально нужны состояние/эффекты/обработчики.
По умолчанию компонент серверный.

---

## 5. Реестр компонентов

Все 55 компонентов уже созданы как заглушки — импортировать можно прямо сейчас,
никто никого не ждёт. Контракт пропсов каждого — в `src/types/ui.ts`.

### 5.1 UI-примитивы — `src/components/ui/` (Агент 1)

| Компонент | Тип пропсов | Назначение |
|---|---|---|
| `Button` | `ButtonProps` | 4 варианта, 3 размера, состояние `loading` |
| `Icon` | `IconProps` | иконка из фиксированного реестра `IconName` |
| `Input` | `InputProps` | текстовое поле с label/hint/error |
| `Textarea` | `TextareaProps` | многострочное поле |
| `Select` | `SelectProps` | выпадающий список |
| `Checkbox` | `CheckboxProps` | чекбокс, `label` принимает ReactNode (ссылка на политику) |
| `Card` | `CardProps` | контейнер-карточка |
| `Badge` | `BadgeProps` | статусный бейдж |
| `Rating` | `RatingProps` | звёзды; с `onChange` — интерактивные |
| `Spinner` | `SpinnerProps` | индикатор загрузки (ТЗ п.6.2) |
| `Skeleton` | `SkeletonProps` | скелетон (ТЗ п.6.2) |
| `Modal` | `ModalProps` | модалка с ловушкой фокуса |
| `Lightbox` | `LightboxProps` | просмотр фото (ТЗ п.5.4) |
| `Accordion` | `AccordionProps` | аккордеон (FAQ, прайс на мобильных) |
| `EmptyState` | `EmptyStateProps` | пустое состояние (ТЗ п.6.2) |
| `Container` | `ContainerProps` | ширина 1280 / 720 / full |
| `Section` | `SectionProps` | вертикальный ритм и фон секции |
| `SectionHeading` | `SectionHeadingProps` | заголовок секции с уровнем h1–h3 |

### 5.2 Layout — `src/components/layout/` (Агент 1)

| Компонент | Тип пропсов | Назначение |
|---|---|---|
| `Header` | `HeaderProps` | шапка, меню, мобильное меню, телефон |
| `Footer` | `FooterProps` | подвал: навигация, контакты, политика |
| `Breadcrumbs` | `BreadcrumbsProps` | хлебные крошки + Schema.org (ТЗ п.6.2) |
| `StickyCta` | `StickyCtaProps` | липкая кнопка заявки на мобильных |
| `MessengerFab` | `MessengerFabProps` | плавающие кнопки WhatsApp/Telegram |

### 5.3 Секции главной — `src/components/sections/` (Агент 2)

Порядок на главной зафиксирован (ТЗ п.5.1) и задан в `src/app/page.tsx`:

`HeroSection` → `ServicesSection` → `AdvantagesSection` → `PortfolioSection` →
`ProcessSection` → `PriceTeaserSection` → `ReviewsSection` → `FaqSection` →
`MapSection` → `CtaSection`

Типы пропсов — одноимённые: `HeroSectionProps` и т.д.

### 5.4 Фичи — `src/components/features/` (Агент 3)

| Компонент | Тип пропсов | Пункт ТЗ |
|---|---|---|
| `ServiceCard` | `ServiceCardProps` | 5.2 |
| `ServiceGrid` | `ServiceGridProps` | 5.2 |
| `ServiceFilter` | `ServiceFilterProps` | 5.2 |
| `PriceTable` | `PriceTableProps` | 5.3 |
| `PortfolioGallery` | `PortfolioGalleryProps` | 5.4 |
| `PortfolioCard` | `PortfolioCardProps` | 5.4 |
| `BeforeAfterSlider` | `BeforeAfterSliderProps` | 5.4 |
| `ReviewCard` | `ReviewCardProps` | 5.7 |
| `ReviewSlider` | `ReviewSliderProps` | 5.1 |
| `MasterCard` | `MasterCardProps` | 4.6 |
| `ProcessSteps` | `ProcessStepsProps` | 4.7 |
| `ContactInfo` | `ContactInfoProps` | 5.8 |
| `WorkStatusBadge` | `WorkStatusBadgeProps` | 5.8 «Открыто/Закрыто» |
| `MapEmbed` | `MapEmbedProps` | 5.8 |
| `BlogCard` | `BlogCardProps` | 4.8 |

### 5.5 Формы — `src/components/forms/` (Агент 4)

| Компонент | Тип пропсов | Примечание |
|---|---|---|
| `RequestForm` | `RequestFormProps` | 3 варианта: `full` / `compact` / `inline` |
| `ReviewForm` | `ReviewFormProps` | отзыв уходит на модерацию |
| `CalculatorForm` | `CalculatorFormProps` | расчёт стоимости (ТЗ п.5.5) |
| `BookingForm` | `BookingFormProps` | онлайн-запись (ТЗ п.5.6, опционально) |
| `ConsentCheckbox` | `ConsentCheckboxProps` | согласие 152-ФЗ, обязателен во всех формах |
| `PhoneInput` | `PhoneInputProps` | маска `+7 (999) 999-99-99` |
| `FileUpload` | `FileUploadProps` | до 5 фото по 10 МБ |

---

## 6. API-контракт форм

Полные типы — [src/types/api.ts](../src/types/api.ts). Клиент — только через
`src/lib/api-client.ts`; **прямой `fetch` в компонентах запрещён**.

### 6.1 Общая форма ответа

```ts
type ApiResponse<T> =
  | { ok: true;  data: T }
  | { ok: false; error: { code: ApiErrorCode; message: string; fields?: Record<string,string> } };
```

`message` всегда на русском и пригоден для показа пользователю.
`fields` — ошибки по именам полей формы, ключ = `name` инпута.

| Код | HTTP | Когда |
|---|---|---|
| `VALIDATION_ERROR` | 422 (400 при битом JSON) | поля не прошли проверку |
| `SPAM_DETECTED` | 400 | honeypot или отправка быстрее 3 с |
| `RATE_LIMITED` | 429 | > 5 заявок с IP за 10 минут |
| `PAYLOAD_TOO_LARGE` | 413 | файл > 10 МБ |
| `UNSUPPORTED_MEDIA` | 415 | тип файла вне списка разрешённых |
| `INTERNAL_ERROR` | 500 | всё остальное |

### 6.2 `POST /api/leads` — заявка

Запрос `LeadRequest`:

| Поле | Тип | Обяз. | Ограничения |
|---|---|---|---|
| `name` | string | да | 2–80 символов |
| `phone` | string | да | E.164 `+7XXXXXXXXXX`, маску снимает клиент |
| `serviceType` | `ServiceSlug` | да | `repair` / `tailoring` / `custom-fit` / `restoration` / `other` |
| `message` | string | нет | до 1000 символов |
| `preferredTime` | `'any'` \| `'morning'` \| `'afternoon'` \| `'evening'` | нет | |
| `preferredChannel` | `'phone'` \| `'whatsapp'` \| `'telegram'` | нет | |
| `consent` | `true` | да | только литерал `true` (152-ФЗ) |
| `source` | `LeadSource` | да | откуда пришла заявка — уходит в аналитику |
| `attachmentIds` | string[] | нет | до 5, из `POST /api/uploads` |
| `hpField` | string | да | honeypot, у человека пустая строка |
| `renderedAt` | number | да | `Date.now()` на монтировании формы |

Ответ 200: `{ ok: true, data: { leadId: string, message: string } }`.

`LeadSource`: `hero`, `services-section`, `service-page`, `price-page`, `portfolio`,
`footer`, `contacts`, `popup`, `sticky-cta`, `calculator`.

### 6.3 Остальные роуты

| Роут | Запрос | Ответ |
|---|---|---|
| `POST /api/reviews` | `ReviewRequest` | `{ reviewId, status: 'pending', message }` |
| `POST /api/uploads` | `multipart/form-data`, поле `file` | `{ attachmentId, fileName, size, mimeType, previewUrl? }` |
| `POST /api/booking` | `BookingRequest` | `{ bookingId, startsAt, message }` |
| `GET /api/booking/slots?date=YYYY-MM-DD` | — | `BookingSlot[]` |

### 6.4 Антиспам без капчи

Реализован в `isSpam()` (`src/lib/validation.ts`), одинаково на клиенте и сервере:

1. **Honeypot** — скрытое поле `hpField`; заполнено → отказ.
2. **Временная ловушка** — отправка быстрее `FORM_LIMITS.minFillMs` (3000 мс) → отказ.
   Верхняя граница `maxFillMs` (12 ч) обязательна: без неё бот подставляет `renderedAt`
   из прошлого и ловушку проходит.
3. **Rate limit** — 5 отправок с IP за 10 минут (реализует Агент 4).

Боту отвечаем нейтральным «Не удалось отправить заявку», чтобы не подсказывать механику.

### 6.5 Поведение формы (одинаково у всех форм)

```
idle → (submit) → validating → submitting → success
                       │            │
                       └── error ───┴──→ error (сообщение над кнопкой,
                                          фокус на первое ошибочное поле)
```

- Валидация полей — на `blur` и на `submit`, не на каждое нажатие.
- Во время `submitting` кнопка в состоянии `loading`, поля заблокированы.
- Успех — экран вместо формы, не alert.
- События аналитики шлёт сама форма: `lead_submit` → `lead_success` / `lead_error`
  (названия целей — `ANALYTICS_EVENTS`, менять нельзя, они настроены в Метрике).

---

## 7. Заглушки: что уже стоит и как заменять

| Что | Состояние | Кто заменяет |
|---|---|---|
| 55 компонентов в `src/components/**` | рендерят `<div data-stub="Имя">` | владелец папки |
| `src/content/*.ts` | правдоподобные тестовые данные | Агент 3 (потом CMS) |
| `src/app/api/leads`, `api/reviews` | валидация и антиспам **настоящие**, доставка — заглушка | Агент 4 |
| `src/lib/notify.ts` | пишет в лог, без Telegram | Агент 4 |
| `/public/images/**` | пусто | Агент 3 |
| Контакты, адрес, телефон | вымышленные | Агент 3 по данным заказчика (ТЗ п.12) |

Правила замены:

1. Заглушку **переписываем целиком**, файл и имя экспорта сохраняем.
2. Пропсы берём из `src/types/ui.ts` как есть. Нужен новый проп — сначала правка контракта.
3. Атрибут `data-stub` удаляем — по нему проверяется готовность:
   `rg 'data-stub' src/` должен вернуть пусто перед сдачей.

---

## 8. Правила совместной работы

1. **Один файл — один владелец.** Нужна правка в чужой зоне — пишешь владельцу, не правишь сам.
2. **Общие файлы** (`src/types/**`, `src/styles/tokens.css`, `src/lib/constants.ts`, этот документ)
   правит только Агент 1 по запросу остальных.
3. **Никаких новых зависимостей** без согласования: каждая бьёт по Core Web Vitals (ТЗ п.7.2).
4. **Не создавать компонент, которого нет в реестре** (раздел 5). Нужен новый — сначала в реестр.
5. **Не дублировать утилиты.** Форматирование цены/телефона/даты уже есть в `src/lib/utils.ts`.
6. Перед коммитом: `npm run typecheck` и `npm run lint` без ошибок.

---

## 9. Definition of Done по агентам

**Агент 1 (ядро).** Все 18 примитивов и 5 layout-компонентов реализованы; клавиатурная
навигация и видимый фокус работают; контраст проверен; шапка/подвал/sticky корректны от 320px.

**Агент 2 (главная).** Все 10 секций отрисованы, порядок из ТЗ п.5.1 соблюдён; на странице
ровно один `h1`; заявка достижима не более чем в 1 клик; LCP-изображение hero имеет `priority`.

**Агент 3 (страницы и фичи).** Страницы услуг, прайса, портфолио, отзывов, «О мастерской»,
«Как мы работаем», контактов и политики; ЧПУ, уникальные Title/Description/H1; Schema.org
`LocalBusiness`, `Service`, `Review`, `BreadcrumbList`; хлебные крошки; пустые состояния фильтров.

**Агент 4 (формы и API).** Все формы отправляются и показывают ошибки по полям; согласие
обязательно; антиспам работает; уведомление в Telegram доходит; цели аналитики срабатывают;
загрузка фото с лимитами.

---

## 10. Чек-лист приёмки (ТЗ п.11)

- [ ] Дизайн соответствует утверждённому макету
- [ ] Chrome, Safari, Firefox, Edge, Яндекс.Браузер; iOS и Android
- [ ] 320–2560px без горизонтальной прокрутки
- [ ] Формы отправляют заявки и уведомления без ошибок
- [ ] LCP < 2.5 с, CLS < 0.1, INP < 200 мс
- [ ] WCAG 2.1 AA: контраст ≥ 4.5:1, alt у всех изображений, навигация с клавиатуры
- [ ] robots.txt, sitemap.xml, метатеги, Open Graph, микроразметка
- [ ] Яндекс.Метрика и цели настроены
- [ ] `rg 'data-stub' src/` пусто
- [ ] `npm run build` и `npm run typecheck` без ошибок

---

## 11. Открытые вопросы к заказчику

Блокируют финальное наполнение, но не разработку — до ответов работаем на заглушках:

1. Название мастерской, логотип, брендбук (влияет на палитру — раздел 3.1).
2. Город, точный адрес, телефон, режим работы.
3. Полный список услуг с ценами (ТЗ п.12).
4. Фотографии работ «до/после» и мастерской.
5. Нужна ли онлайн-запись с календарём (ТЗ п.5.6) — сейчас в контракте есть, в план работ не включена.
6. Нужен ли блог на старте (ТЗ п.4.8).
7. Куда дублировать заявки, кроме Telegram: почта, Google Таблица, CRM (ТЗ п.9).
8. Реквизиты и юрлицо для политики конфиденциальности.
