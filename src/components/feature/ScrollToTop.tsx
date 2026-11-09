import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every route change, scroll back to the top — or to the anchor target
 * when the URL carries a hash (e.g. /features#notes).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}