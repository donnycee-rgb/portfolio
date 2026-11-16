import { useEffect, useRef, useState } from 'react';
import { NavLink } from '@/components/ui/TransitionLink';
import { dock } from '@/content/site';

// Line icons on a 24 × 24 grid, one per tab
const ICONS: Record<string, string> = {
  home: 'M3 11l9-7 9 7 M5 9.5V20h5v-6h4v6h5V9.5',
  work: 'M3 5h18v14H3z M3 9h18 M3 15h18 M7 5v4 M12 5v4 M17 5v4 M7 15v4 M12 15v4 M17 15v4',
  about: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5',
  contact: 'M4 5h16v11H8l-4 4z M8 9h8 M8 12h5',
};

/**
 * Phones' navigation: a dock along the bottom, within thumb reach — Home, Work, About, Contact —
 * with the current page lit in silver. A thin playhead along its top edge shows how far down the
 * page you are, like a video scrubber. It slides away while you type (so it never covers the
 * keyboard) and sits above the iPhone home bar. Hidden from tablet width up, where the header has the links.
 */
export function MobileDock() {
  const barRef = useRef<HTMLSpanElement>(null);
  const [typing, setTyping] = useState(false);

  // Playhead: scroll progress through the page
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      barRef.current?.style.setProperty('transform', `scaleX(${p.toFixed(4)})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Out of the way while a text field has focus (the on-screen keyboard is up)
  useEffect(() => {
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches('input, textarea, select, [contenteditable]');
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
        typing ? 'translate-y-[150%]' : 'translate-y-0'
      }`}
      style={{ viewTransitionName: 'site-dock' }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink/90 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md">
        {/* Playhead */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <span ref={barRef} aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand" />

        <ul className="grid grid-cols-4">
          {dock.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative flex min-h-[3.75rem] flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                    isActive ? 'text-brand' : 'text-white/55 active:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* A soft glow behind the current tab */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2 inset-y-1.5 rounded-xl bg-white/[0.06] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={ICONS[item.icon]} />
                    </svg>
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
