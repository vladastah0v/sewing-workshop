/**
 * Мелкие общие утилиты. Владелец: Агент 1.
 * Всё, что нужно двум и более агентам, живёт здесь, а не дублируется.
 */

/** Склейка классов без зависимостей: cn('a', cond && 'b'). */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/** 1200 -> «1 200 ₽». null -> «по замерам». */
export function formatPrice(value: number | null): string {
  if (value === null) return 'по замерам';
  return `${new Intl.NumberFormat('ru-RU').format(value)} \u20BD`;
}

/** [1, 3] -> «1–3 дня»; [1, 1] -> «1 день». */
export function formatLeadTime([min, max]: [number, number]): string {
  const word = (n: number) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'день';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'дня';
    return 'дней';
  };
  return min === max ? `${min} ${word(min)}` : `${min}\u2013${max} ${word(max)}`;
}

/** '+79991234567' -> '+7 (999) 123-45-67'. */
export function formatPhone(e164: string): string {
  const d = e164.replace(/\D/g, '');
  if (d.length !== 11) return e164;
  return `+${d[0]} (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}`;
}

/** ISO-дата -> «12 сентября 2026». */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
