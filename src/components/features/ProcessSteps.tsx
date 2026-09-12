/**
 * ProcessSteps — этапы работы (ТЗ п.4.7).
 * Владелец: Агент 3. Контракт пропсов: ProcessStepsProps в src/types/ui.ts.
 *
 * Нумерованный список: порядок шагов — это смысл, а не оформление, поэтому ol.
 * Соединительная линия — абсолютно позиционированный элемент внутри li,
 * скрытый от скринридера; у последнего шага её нет.
 *
 * Геометрия линии завязана на размер кружка (size-12 = 48px, центр — 24px)
 * и на зазор между элементами: gap-8 (32px) по вертикали, gap-6 (24px) по горизонтали.
 */

import type { ProcessStepsProps } from '@/types';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function ProcessSteps({
  steps,
  orientation = 'horizontal',
  className,
  id,
}: ProcessStepsProps) {
  const ordered = [...steps].sort((a, b) => a.order - b.order);
  const isVertical = orientation === 'vertical';

  return (
    <ol
      id={id}
      className={cn(
        'grid grid-cols-1 gap-8',
        !isVertical && 'sm:grid-cols-2 lg:grid-cols-5 lg:gap-6',
        className,
      )}
    >
      {ordered.map((step, index) => {
        const isLast = index === ordered.length - 1;

        return (
          <li
            key={step.id}
            className={cn('relative flex gap-5', !isVertical && 'lg:flex-col lg:gap-4')}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
              {step.iconName ? (
                <Icon name={step.iconName} size={22} />
              ) : (
                <span className="font-heading text-lg">{step.order}</span>
              )}
            </span>

            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  // Вертикальная нить: от низа кружка до следующего элемента списка.
                  'absolute top-14 -bottom-8 left-6 w-px bg-border',
                  // Горизонтальная раскладка: на sm сетка в две колонки, и следующий шаг
                  // стоит справа, а не снизу — вертикальная нить там врала бы, прячем её.
                  // От lg рисуем горизонтальную нить вправо через зазор сетки.
                  !isVertical &&
                    'sm:hidden lg:block lg:top-6 lg:-right-6 lg:bottom-auto lg:left-14 lg:h-px lg:w-auto',
                )}
              />
            )}

            <div className="flex flex-col gap-2 pb-2">
              <p className="text-sm font-semibold text-accent">Шаг {step.order}</p>
              <h3 className="font-heading text-xl">{step.title}</h3>
              <p className="text-text-muted">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
