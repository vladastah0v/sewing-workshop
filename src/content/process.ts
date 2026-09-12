/** Этапы работы (ТЗ п.4, раздел 7). ЗАГЛУШКА. */
import type { ProcessStepData } from '@/types';

export const PROCESS_STEPS: ProcessStepData[] = [
  { id: 'st-1', order: 1, title: 'Заявка', description: 'Оставляете заявку — перезваниваем в течение 15 минут.', iconName: 'phone' },
  { id: 'st-2', order: 2, title: 'Замер', description: 'Снимаем мерки в мастерской и согласуем стоимость.', iconName: 'ruler' },
  { id: 'st-3', order: 3, title: 'Работа', description: 'Ремонтируем или шьём. Держим в курсе по мессенджеру.', iconName: 'scissors' },
  { id: 'st-4', order: 4, title: 'Примерка', description: 'Проверяем посадку и правим, если нужно.', iconName: 'hanger' },
  { id: 'st-5', order: 5, title: 'Выдача', description: 'Отдаём готовое изделие с гарантией 30 дней.', iconName: 'check' },
];
