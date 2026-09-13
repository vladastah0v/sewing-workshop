'use client';

import { useEffect, useRef } from 'react';

import type { PageBackgroundProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * PageBackground — фоновое полотно сайта. Владелец: Агент 1.
 *
 * Фиксированный слой под всем контентом: фотография ткани, поверх неё —
 * плотная вуаль цветом фона. Вуаль обязательна: без неё контраст текста
 * зависел бы от того, какой пиксель фотографии оказался под строкой.
 *
 * «Вода» при прокрутке: считаем скорость скролла и размываем ТОЛЬКО этот слой,
 * затухая по экспоненте, как круги на воде. Текст и карточки остаются резкими —
 * размытие содержимого читалось бы как неисправность, а не как эффект.
 * При prefers-reduced-motion эффект не включается вовсе.
 */
export function PageBackground({ className, id }: PageBackgroundProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastY = window.scrollY;
    let energy = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      // Затухание: чем дольше не крутят, тем спокойнее «вода».
      energy *= 0.88;

      const blur = Math.min(energy * 0.07, 9);
      const scale = 1 + Math.min(energy * 0.00035, 0.035);

      layer.style.setProperty('--page-bg-blur', `${blur.toFixed(2)}px`);
      layer.style.setProperty('--page-bg-scale', scale.toFixed(4));

      if (blur > 0.04) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
        layer.style.setProperty('--page-bg-blur', '0px');
        layer.style.setProperty('--page-bg-scale', '1');
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      // Копим модуль смещения: работает одинаково вверх и вниз.
      energy = Math.min(energy + Math.abs(y - lastY), 130);
      lastY = y;

      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div id={id} aria-hidden className={cn('page-bg', className)}>
      <div ref={layerRef} className="page-bg__image" />
      <div className="page-bg__veil" />
    </div>
  );
}
