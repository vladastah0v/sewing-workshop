/**
 * Контактные данные мастерской. Владелец файла: Агент 3.
 *
 * Значки мессенджеров — косметические: у мастерской пока нет аккаунтов,
 * поэтому href не задан и компоненты рендерят их как span, а не ссылку.
 * Как только появятся реальные адреса — достаточно добавить href.
 */
import type { ContactInfoData } from '@/types';

export const CONTACTS: ContactInfoData = {
  organizationName: 'Швейная мастерская ЛатАс',
  phone: '+79033509264',
  phoneDisplay: '+7 (903) 350-92-64',
  email: 'daristarhova@mail.ru',
  addressLine: 'ул. Ферина, 13/1',
  city: 'Уфа',
  // Координаты не выверены по карте — виджет ищет точку по адресу (mapQuery),
  // а geo в микроразметку не попадает: ошибочный пин хуже отсутствующего.
  mapQuery: 'Уфа, улица Ферина, 13/1',
  directions: 'Заезд со стороны улицы Ферина, вход напротив церкви.',
  timeZone: 'Asia/Yekaterinburg',
  workingHours: [
    { day: 1, opensAt: '10:00', closesAt: '19:00' },
    { day: 2, opensAt: '10:00', closesAt: '19:00' },
    { day: 3, opensAt: '10:00', closesAt: '19:00' },
    { day: 4, opensAt: '10:00', closesAt: '19:00' },
    { day: 5, opensAt: '10:00', closesAt: '19:00' },
    { day: 6, opensAt: null, closesAt: null },
    { day: 7, opensAt: null, closesAt: null },
  ],
  messengers: [
    { kind: 'whatsapp', label: 'WhatsApp' },
    { kind: 'max', label: 'MAX' },
    { kind: 'telegram', label: 'Telegram' },
  ],
  // Реквизиты оператора ПДн (152-ФЗ), переданы заказчиком 14.09.2026.
  // legalAddress не задан намеренно: юридический адрес ИП — домашний, на сайт
  // по решению заказчика не выводится, /privacy берёт адрес мастерской.
  // Банковские реквизиты на сайте не публикуются.
  legalEntity: {
    name: 'ИП Аристархова Динара Миндулловна',
    inn: '027711514859',
    ogrn: '321028000207690',
  },
};
