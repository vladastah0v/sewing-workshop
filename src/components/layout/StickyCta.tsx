'use client';

import { useEffect, useState } from 'react';

import type { StickyCtaProps } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

/**
 * Липкая кнопка заявки на мобильных (ТЗ п.6.2).
 * На десктопе скрыта: там CTA всегда виден в шапке.
 */
export function StickyCta({
  label = 'Оставить заявку',
  onClick,
  href = '/contacts',
  showAfterScroll = 480,
  className,
  id,
}: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfterScroll);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfterScroll]);

  return (
    <div
      id={id}
      hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-[var(--z-sticky-cta)] lg:hidden',
        'border-t border-border bg-bg/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur',
        className,
      )}
    >
      <Button href={onClick ? undefined : href} onClick={onClick} size="lg" fullWidth>
        {label}
      </Button>
    </div>
  );
}
