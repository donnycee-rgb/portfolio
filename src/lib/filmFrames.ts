/**
 * Geometry of the frames on the branching film strip (src/assets/illustrations/film-branch.svg,
 * viewBox 0 0 169.33 112.89), and the icons drawn into them.
 *
 * Each frame is a parallelogram: origin `o`, and edge vectors `ex` (along the strip) and `ey` (down
 * the frame). They were measured from the content the original artist placed in each frame, so
 * anything drawn in frame space takes on the strip's perspective. `u`/`v` (0–1) is where the icon sits.
 */
export const FILM_VIEWBOX = { width: 169.33, height: 112.89 };

export interface FilmFrame {
  o: [number, number];
  ex: [number, number];
  ey: [number, number];
  u: number;
  v: number;
}

// In reel order: A, B (trunk) · C (split) · D, E (upper / picture) · F, G (lower / sound).
// A and E run off the edge of the drawing, so their icons sit in the visible part.
export const FILM_FRAMES: FilmFrame[] = [
  { o: [-5.32, 27.32], ex: [26.71, 1.14], ey: [1.06, 17.42], u: 0.56, v: 0.45 },
  { o: [33.01, 30.88], ex: [28.65, 1.91], ey: [0.97, 18.06], u: 0.5, v: 0.45 },
  { o: [73.39, 35.08], ex: [31.35, -5.69], ey: [0.42, 18.27], u: 0.45, v: 0.45 },
  { o: [116.99, 28.16], ex: [27.67, -9.81], ey: [0.09, 18.02], u: 0.5, v: 0.45 },
  { o: [154.35, 16.24], ex: [25.59, -11.36], ey: [-0.25, 17.8], u: 0.3, v: 0.45 },
  // The sound branch has one long, open-ended window: sound design and mix share it
  { o: [114, 45.5], ex: [37.5, 20.5], ey: [0, 27], u: 0.27, v: 0.4 },
  { o: [114, 45.5], ex: [37.5, 20.5], ey: [0, 27], u: 0.73, v: 0.4 },
];

/** Icons on a 24 × 24 grid, drawn as strokes so they can trace themselves. Same order as the frames. */
export const FILM_ICONS: string[] = [
  // Brief — lightbulb
  'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1v1h5v-1c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  // Design — wireframe panels
  'M3 4h8v6H3z M13 4h8v6h-8z M3 13h8v6H3z M13 14h8 M13 17h6 M13 20h4',
  // Foundations — stacked layers
  'M12 3l9 5-9 5-9-5 9-5z M3 12.5l9 5 9-5 M3 17l9 5 9-5',
  // Interface — a browser window
  'M3 5h18v14H3z M3 9h18 M6 7h.01 M8.5 7h.01 M7 13h6 M7 16h10',
  // Polish — colour wheel
  'M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0 M12 12V3 M12 12l7.8 4.5 M12 12l-7.8 4.5',
  // API — code brackets
  'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16',
  // Data — a database
  'M20 6c0 1.7-3.6 3-8 3S4 7.7 4 6s3.6-3 8-3 8 1.3 8 3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
];

const length = ([x, y]: [number, number]) => Math.hypot(x, y);

/** SVG transform that maps the unit square onto a frame (giving it the strip's perspective). */
export const frameMatrix = (f: FilmFrame) => `matrix(${f.ex[0]} ${f.ex[1]} ${f.ey[0]} ${f.ey[1]} ${f.o[0]} ${f.o[1]})`;

/**
 * Inside a frame: place a 24-unit icon of `size` drawing units, centred at the frame's (u, v),
 * undoing the frame's stretch so the icon keeps its proportions.
 */
export const iconTransform = (f: FilmFrame, size: number) =>
  `translate(${f.u} ${f.v}) scale(${size / length(f.ex) / 24} ${size / length(f.ey) / 24}) translate(-12 -12)`;

/** Where a frame's centre sits across the drawing (0 = left edge, 1 = right) — when the reel reaches it. */
export const frameProgress = (f: FilmFrame) =>
  Math.min(1, Math.max(0, (f.o[0] + f.ex[0] * f.u + f.ey[0] * f.v) / FILM_VIEWBOX.width));
