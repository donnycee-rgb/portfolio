import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SplitFrameProps {
  src: string;
  alt: string;
  labels: { picture: string; sound: string; hint: string; hintTouch: string; handle: string };
  className?: string;
}

/** How quickly the split catches up with the pointer each frame (0–1) */
const EASE = 0.14;
/** The split can't go closer than this to either edge (%) */
const EDGE = 6;

type Token = [text: string, kind?: 'key' | 'str' | 'fn' | 'dim'];
/** The code side: a short, real-looking handler (the kind of thing in Nexus), kept narrow enough for half a frame */
const CODE: Token[][] = [
  [['const ', 'key'], ['user = '], ['await ', 'key'], ['db.user']],
  [['  .'], ['findUnique', 'fn'], ['({ where: { id } });']],
  [],
  [['if ', 'key'], ['(!'], ['can', 'fn'], ['(user.role, '], ["'invite'", 'str'], ['))']],
  [['  throw new ', 'key'], ['HttpError', 'fn'], ['(403);']],
  [],
  [['// signed, single-use link', 'dim']],
  [['const ', 'key'], ['link = '], ['signInvite', 'fn'], ['(email);']],
  [['await ', 'key'], ['sendMail', 'fn'], ['(email, link);']],
  [],
  [['res.'], ['status', 'fn'], ['(201).'], ['json', 'fn'], ['({ ok: '], ['true', 'key'], [' });']],
];
const TOKEN_CLASS = { key: 'text-brand-light', str: 'text-brand', fn: 'text-white', dim: 'text-white/35' } as const;

/**
 * One frame, shown two ways: the design on the left (a real screen), its code on the right (over
 * the dimmed screen). An "=" handle splits them; the split follows the mouse across the frame, can be
 * dragged on touch screens, and moves with the arrow keys — a bonus: it rests half and half, so both
 * sides are seen without touching it. The split position reaches the CSS as --split (%).
 */
export function SplitFrame({ src, alt, labels, className = '' }: SplitFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const handleRef = useRef<HTMLDivElement>(null);
  const split = useRef({ value: 50, target: 50, raf: 0 });
  const [mouse] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  const write = () => {
    frameRef.current?.style.setProperty('--split', `${split.current.value.toFixed(2)}%`);
    handleRef.current?.setAttribute('aria-valuenow', String(Math.round(split.current.value)));
  };

  // Ease the split towards its target
  const run = () => {
    const s = split.current;
    if (s.raf) return;
    const step = () => {
      s.value += (s.target - s.value) * (reduced ? 1 : EASE);
      if (Math.abs(s.target - s.value) < 0.05) s.value = s.target;
      write();
      s.raf = s.value === s.target ? 0 : requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  };

  const moveTo = (percent: number) => {
    split.current.target = Math.min(100 - EDGE, Math.max(EDGE, percent));
    run();
  };

  useEffect(() => () => cancelAnimationFrame(split.current.raf), []);

  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    moveTo(((e.clientX - rect.left) / rect.width) * 100);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    // Mouse: follows freely. Touch/pen: only while pressed (a drag)
    if (e.pointerType === 'mouse' || e.buttons) fromPointer(e);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowLeft' ? -5 : e.key === 'ArrowRight' ? 5 : 0;
    if (!step) return;
    e.preventDefault();
    moveTo(split.current.target + step);
  };

  return (
    <div
      ref={frameRef}
      onPointerMove={onPointerMove}
      onPointerDown={fromPointer}
      onPointerLeave={(e) => e.pointerType === 'mouse' && moveTo(50)}
      className={`relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-ink [--split:50%] ${className}`}
    >
      {/* Picture */}
      <img src={src} alt={alt} draggable={false} className="absolute inset-0 h-full w-full object-cover" />

      {/* Code: the same screen, dimmed, with the code behind it — revealed right of the split */}
      <div aria-hidden="true" className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 var(--split))' }}>
        <img src={src} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_brightness(0.25)_blur(2px)]" />
        <div className="absolute inset-0 bg-ink/70" />
        <pre className="absolute inset-y-0 left-[54%] right-[4%] flex flex-col justify-center overflow-hidden font-mono text-[clamp(9px,1.05vw,13px)] leading-[1.7] text-brand/80">
          {CODE.map((line, i) => (
            <span key={i} className="block min-h-[1.7em] whitespace-pre">
              <span className="mr-3 inline-block w-4 text-right text-white/20">{i + 1}</span>
              {line.map(([text, kind], j) => (
                <span key={j} className={kind ? TOKEN_CLASS[kind] : undefined}>
                  {text}
                </span>
              ))}
              {/* A blinking cursor at the end of the last line */}
              {i === CODE.length - 1 && !reduced && <span className="ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] animate-rec bg-brand" />}
            </span>
          ))}
        </pre>
      </div>

      {/* Labels for each side */}
      <span className="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-sm">
        {labels.picture}
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink">
        {labels.sound}
      </span>
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">{mouse ? labels.hint : labels.hintTouch}</span>

      {/* The split, with its "=" handle */}
      <div className="pointer-events-none absolute inset-y-0 left-[var(--split)] w-0.5 -translate-x-1/2 bg-paper">
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label={labels.handle}
          aria-valuemin={EDGE}
          aria-valuemax={100 - EDGE}
          aria-valuenow={50}
          aria-valuetext={`${labels.picture} / ${labels.sound}`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-2xl font-semibold leading-none text-ink shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          =
        </div>
      </div>
    </div>
  );
}
