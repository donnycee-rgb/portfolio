import { useEffect, useState } from 'react';

/** True while the CSS media query matches, e.g. useMediaQuery('(max-width: 767px)'). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Phones: below Tailwind's md breakpoint */
export const PHONE_QUERY = '(max-width: 767px)';
