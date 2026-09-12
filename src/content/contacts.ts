/**
 * Контактные данные. ЗАГЛУШКА — реальные значения даёт заказчик (ТЗ п.12).
 * Владелец файла: Агент 3. Позже переезжает в CMS.
 */
import type { ContactInfoData } from '@/types';

export const CONTACTS: ContactInfoData = {
  organizationName: 'Швейная мастерская',
  phone: '+79990000000',
  phoneDisplay: '+7 (999) 000-00-00',
  email: 'info@example.ru',
  addressLine: 'ул. Примерная, 1, офис 10',
  city: 'Москва',
  postalCode: '101000',
  coordinates: [55.75396, 37.620393],
  timeZone: 'Europe/Moscow',
  // Реквизиты оператора ПДн (152-ФЗ). Пока не переданы заказчиком —
  // страница /privacy сама покажет пометку «реквизиты уточняются».
  // Заполнить по образцу и раскомментировать:
  // legalEntity: {
  //   name: 'ИП Фамилия Имя Отчество',
  //   inn: '000000000000',
  //   ogrn: '000000000000000',
  //   legalAddress: 'Москва, ул. Примерная, 1',
  // },
  workingHours: [
    { day: 1, opensAt: '10:00', closesAt: '20:00' },
    { day: 2, opensAt: '10:00', closesAt: '20:00' },
    { day: 3, opensAt: '10:00', closesAt: '20:00' },
    { day: 4, opensAt: '10:00', closesAt: '20:00' },
    { day: 5, opensAt: '10:00', closesAt: '20:00' },
    { day: 6, opensAt: '11:00', closesAt: '18:00' },
    { day: 7, opensAt: null, closesAt: null },
  ],
  messengers: [
    { kind: 'whatsapp', href: 'https://wa.me/79990000000', label: 'WhatsApp' },
    { kind: 'telegram', href: 'https://t.me/example', label: 'Telegram' },
  ],
};
