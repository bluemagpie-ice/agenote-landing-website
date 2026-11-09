import { useEffect, useRef, useState } from 'react';

/**
 * 滚动进度追踪：为一组纵向排列的面板计算「已经滚过多少」，
 * 同时判断当前正在视口中间的那一块，用来驱动左侧阶段导航。
 */
export default function useStageProgress(count: number) {
  const refs = useRef<Array<HTMLElement | null>>(Array.from({ length: count }, () => null));
  const [progress, setProgress] = useState<number[]>(() => Array.from({ length: count }, () => 0));
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    let previous: number[] = Array.from({ length: count }, () => -1);

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      const anchor = vh * 0.45;
      const next: number[] = [];
      let activeIndex = 0;

      for (let i = 0; i < count; i += 1) {
        const el = refs.current[i];
        if (!el) {
          next.push(0);
          continue;
        }
        const rect = el.getBoundingClientRect();
        const span = Math.max(rect.height - vh * 0.2, 1);
        const raw = (anchor - rect.top) / span;
        next.push(Math.min(1, Math.max(0, Math.round(raw * 100) / 100)));
        if (rect.top <= anchor) activeIndex = i;
      }

      const changed = next.some((v, i) => Math.abs(v - previous[i]) > 0.004);
      if (changed) {
        previous = next;
        setProgress(next);
      }
      setActive(activeIndex);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [count]);

  return { refs, progress, active };
}