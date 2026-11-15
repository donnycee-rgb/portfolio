# Illustrations

| File                         | What                                   | Status |
| ---------------------------- | -------------------------------------- | ------ |
| `map.svg`                    | Africa, Kenya highlighted in silver    | Used on the homepage ("Based in Nairobi") |
| `Blank_Map-Africa.svg`       | Original map (unedited)                | Source, kept for re-styling |
| `film-branch.svg`            | Branching film strip, off-white        | Used on the About page ("How I build") |
| `Schroedingers_cat_film.svg` | Original film-strip drawing            | Source, kept for re-styling |

## Credits & licences (all public domain / CC0 — no credit required)

- **Map** — "Blank Map-Africa.svg" by Andreas 06, Wikimedia Commons — public domain.
  Cleaned: scale bar, labels and editor metadata removed; restyled for the dark panel.
  Note: the source map predates 2011, so South Sudan is drawn as part of Sudan.
- **Film strip** — "Schroedingers cat film.svg" by Christian Schirm, Wikimedia Commons — CC0.
  Cleaned: cat, box, hammer, radiation sign, skulls, shadows and frosted panels removed; recoloured off-white.
  The icons in the frames are drawn in code (`src/lib/filmFrames.ts`).

## Drawn in code

- **DC monogram** — `src/components/ui/LogoMark.tsx` (also `public/favicon.svg`), redrawn from Dennis's logo.
- **Nairobi skyline** — `src/lib/nairobiSkyline.ts`: one roofline with each real landmark once (simplified shapes,
  not traced). Its soundwave follows the same roofline, so editing a building there updates the wave too.
- **Hero background** — `public/images/hero-brushed.svg` (brushed black metal, like the logo's backdrop).

Only add drawings you made, public-domain/CC0 files, or stock licensed for commercial use. Record any required credit here.
