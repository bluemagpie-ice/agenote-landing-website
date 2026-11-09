import { useEffect, useRef, useState } from 'react';

/** 元素第一次进入视口后返回 true，用于分段出现的演示内容。 */
export default function useInView<T extends HTMLElement>(rootMargin = '-12%') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: `0px 0px ${rootMargin} 0px` },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}