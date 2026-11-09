import { useEffect } from 'react';

/**
 * Global IntersectionObserver-based reveal animation activator.
 * Any element with [data-reveal] gets the `is-visible` class added when
 * it scrolls into view. Children with .stagger-child auto-animate via CSS.
 *
 * Mount once near the app root.
 */
export default function useReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]'),
    );
    if (targets.length === 0) return;

    // Initialize stagger indexes
    targets.forEach((el) => {
      if (el.hasAttribute('data-reveal-stagger')) {
        const kids = el.querySelectorAll<HTMLElement>('.stagger-child');
        kids.forEach((kid, i) => {
          if (!kid.style.getPropertyValue('--si')) {
            kid.style.setProperty('--si', String(i));
          }
        });
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    );

    targets.forEach((el) => io.observe(el));

    // Re-scan after a tick in case of route-rendered nodes
    const rescan = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible), [data-reveal-stagger]:not(.is-visible)')
        .forEach((el) => io.observe(el));
    }, 80);

    return () => {
      clearTimeout(rescan);
      io.disconnect();
    };
  }, []);
}