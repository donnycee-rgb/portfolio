import { useId } from 'react';

/**
 * The DC monogram, redrawn from Dennis's logo: a serif D, an interlocking C crossing its lower half,
 * and a terminal prompt (>_) in the C's mouth. Drawing units: 240 × 200.
 */
// D: outline with top and bottom serifs, and its counter (evenodd cuts the hole)
const D = 'M20 14 H92 C138 14 160 46 160 84 C160 122 138 154 92 154 H20 V146 H34 V22 H20 Z M52 22 H90 C124 22 142 48 142 84 C142 120 124 146 90 146 H52 Z';
// C: a crescent, heavy on the left and thinning to its tips, open to the right
const C = 'M187 78.7 A72 72 0 1 0 187 161.3 L183.5 153.3 A58 58 0 1 1 183.5 86.7 Z';
// The prompt: a chevron and an underscore
const PROMPT = 'M196 110 L209 119 L196 128 M213 131 H232';

interface LogoMarkProps {
  className?: string;
  /**
   * 'static'  — solid mark; a light glint races round the letters when a parent `.group` is hovered.
   * 'drawing' — outline starts hidden; set `drawn` to true to trace it, then fill (used by the intro).
   */
  variant?: 'static' | 'drawing';
  drawn?: boolean;
}

/** The DC monogram as inline SVG, so it can be animated. Brushed-silver fill, like the logo's metal. */
export function LogoMark({ className = '', variant = 'static', drawn = false }: LogoMarkProps) {
  const drawing = variant === 'drawing';
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const fillDelay = { transition: 'fill-opacity 500ms ease-out 1000ms' };

  return (
    <svg viewBox="14 8 224 188" className={className} aria-hidden="true">
      <defs>
        {/* Brushed metal: light top, a darker band, bright again below */}
        <linearGradient id={`metal-${id}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#f4f5f7" />
          <stop offset="0.45" stopColor="#a9aeb6" />
          <stop offset="0.7" stopColor="#dfe2e6" />
          <stop offset="1" stopColor="#8f949c" />
        </linearGradient>
        {/* Where the C crosses the D, a thin gap separates them (so they read as interlocking) */}
        <mask id={`gap-${id}`} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="260" height="220" fill="white" />
          <path d={C} fill="black" stroke="black" strokeWidth="9" strokeLinejoin="round" />
        </mask>
      </defs>

      {/* Solid letters */}
      <g fill={`url(#metal-${id})`} style={drawing ? { fillOpacity: drawn ? 1 : 0, ...fillDelay } : undefined}>
        <path d={D} fillRule="evenodd" mask={`url(#gap-${id})`} />
        <path d={C} />
      </g>
      <path
        d={PROMPT}
        fill="none"
        stroke={`url(#metal-${id})`}
        strokeWidth="5"
        strokeLinecap="square"
        style={drawing ? { opacity: drawn ? 1 : 0, transition: 'opacity 400ms ease-out 1200ms' } : undefined}
      />

      {/* Outline layer: traces the letters (intro), or on hover a short light dash travels the full
          outline — it starts just before the path (offset 0.25) and ends just past it (offset -1), so it is invisible at rest */}
      <g
        fill="none"
        stroke={drawing ? 'var(--color-brand)' : 'var(--color-paper)'}
        strokeWidth={drawing ? 1.6 : 2.6}
        strokeLinejoin="round"
        // Flat ends for the hover dash, so no cap peeks out while it waits off the path
        strokeLinecap={drawing ? 'round' : 'butt'}
      >
        {[D, C].map((d) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            className={
              drawing
                ? ''
                : '[stroke-dasharray:0.25_2] [stroke-dashoffset:0.25] group-hover:[stroke-dashoffset:-1] group-hover:transition-[stroke-dashoffset] group-hover:duration-[900ms] group-hover:ease-out'
            }
            style={
              drawing
                ? { strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: 'stroke-dashoffset 1100ms cubic-bezier(0.65, 0, 0.35, 1)' }
                : undefined
            }
          />
        ))}
      </g>
    </svg>
  );
}
