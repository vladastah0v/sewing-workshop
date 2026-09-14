# Сайт швейной мастерской

Next.js 15 (App Router) + TypeScript + Tailwind v4.

## Перед началом работы

**Прочитай [docs/CONTRACTS.md](docs/CONTRACTS.md).** Там зафиксированы токены,
структура папок, зоны ответственности, реестр компонентов и API-контракт форм.
Код, расходящийся с контрактом, не принимается.

## Запуск

```bash
npm install          # требуется Node.js >= 20.9
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | дев-сервер |
| `npm run build` | продакшн-сборка |
| `npm run typecheck` | проверка типов без сборки |
| `npm run lint` | ESLint (flat-конфиг, `eslint.config.mjs`) |
| `npm run lint:fix` | ESLint с автоисправлением |

## Деплой на сервер

Сервер — Selectel VDS (Ubuntu), сайт в Docker, HTTPS даёт Caddy.

```bash
# на сервере, в папке проекта, рядом с .env (NEXT_PUBLIC_SITE_URL, SITE_ADDRESS)
docker compose up -d --build     # первый запуск и каждое обновление после git pull
docker compose logs --tail=50    # логи
```

Файлы: `Dockerfile` (сборка `output: 'standalone'`), `docker-compose.yml` (сайт + Caddy),
`Caddyfile` (прокси и сертификаты).

## Состояние

Каркас и контракты готовы, компоненты — заглушки.
Найти незаменённые: `rg 'data-stub' src/`.
