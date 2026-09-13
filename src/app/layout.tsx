import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyCta } from '@/components/layout/StickyCta';
import { CONTACTS } from '@/content/contacts';
import { MAIN_NAV, SITE_NAME, SITE_URL } from '@/lib/constants';

import './globals.css';

/* Шрифты подключены через next/font: без внешних запросов и без CLS. */
const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ремонт и пошив одежды`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Ремонт, подгонка и индивидуальный пошив одежды. Срок от 1 дня, гарантия на работу.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#b45a31',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        <Header nav={MAIN_NAV} contacts={CONTACTS} />
        <main id="main">{children}</main>
        <Footer nav={MAIN_NAV} contacts={CONTACTS} />
        <StickyCta label="Позвонить" href={`tel:${CONTACTS.phone}`} />
      </body>
    </html>
  );
}
