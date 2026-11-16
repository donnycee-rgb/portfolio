import { useEffect, useState } from 'react';
import { intro, site } from '@/content/site';
import { LogoMark } from '@/components/ui/LogoMark';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SEEN_KEY = 'av-intro-seen';
// The outline traces (0–1.4s), the silver fills in (1.3–1.9s) and the name fades in (1.6s);
// then the finished logo holds on screen for a moment before the curtain lifts
const DRAW_MS = 3100;
const LIFT_MS = 800;

/** How long the first-visit intro covers the page, so the page can start its own entrance after it */
export const INTRO_MS = DRAW_MS + LIFT_MS;

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false; // storage blocked: just show it
  }
};

/** True while the intro is still to play this session (read it before the intro starts, e.g. in a first render) */
export const introPending = () => !alreadySeen() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * First-visit intro: the DC monogram traces itself in silver, fills in, holds with the name beneath it,
 * then the curtain lifts.
 * Shown once per browser session; click to skip; never shown with reduced motion.
 */
export function IntroCurtain() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<'hidden' | 'drawing' | 'drawn' | 'lifting'>(() =>
    reduced || alreadySeen() ? 'hidden' : 'drawing',
  );

  useEffect(() => {
    if (stage === 'hidden') return;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // ignore — the intro may simply show again next visit
    }
    // Next frame: start the trace (so the hidden → drawn transition actually animates)
    const start = window.setTimeout(() => setStage((s) => (s === 'drawing' ? 'drawn' : s)), 60);
    const lift = window.setTimeout(() => setStage('lifting'), DRAW_MS);
    const done = window.setTimeout(() => setStage('hidden'), DRAW_MS + LIFT_MS);
    return () => [start, lift, done].forEach(window.clearTimeout);
    // Timers are set up once, when the intro starts (empty dependency list on purpose)
  }, []);

  if (stage === 'hidden') return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setStage('hidden')}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-6 bg-ink transition-transform ease-[cubic-bezier(0.7,0,0.3,1)] ${
        stage === 'lifting' ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionDuration: `${LIFT_MS}ms` }}
    >
      <LogoMark variant="drawing" drawn={stage !== 'drawing'} className="h-32 w-auto sm:h-44" />
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.35em] text-white/60 transition-opacity duration-500 ${
          stage === 'drawing' ? 'opacity-0' : 'opacity-100 delay-[1600ms]'
        }`}
      >
        {site.name} · {site.tagline}
      </p>
      <p
        className={`absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 transition-opacity duration-500 ${
          stage === 'drawing' ? 'opacity-0' : 'opacity-100 delay-[800ms]'
        }`}
      >
        {intro.skip}
      </p>
    </div>
  );
}
