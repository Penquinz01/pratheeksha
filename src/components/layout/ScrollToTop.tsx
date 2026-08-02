import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A link that targets an anchor (e.g. /programs#rehab) should land on that
    // anchor, not the top of the page. Falls through to the top if the target
    // is missing so a stale hash can never leave the visitor mid-page.
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname, hash]);

  return null;
};
