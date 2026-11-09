import { useLocation } from 'react-router-dom';
import useReveal from '@/hooks/useReveal';

function RevealRunner() {
  useReveal();
  return null;
}

/**
 * Drop this once inside BrowserRouter to activate all [data-reveal] /
 * [data-reveal-stagger] animations. Re-mounts on route change so newly
 * rendered sections animate in correctly.
 */
export default function RevealRoot() {
  const location = useLocation();
  return <RevealRunner key={location.pathname} />;
}