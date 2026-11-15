# Dennis Cira Mwendia — Portfolio

Personal portfolio of Dennis Cira Mwendia, full-stack developer and AI training specialist in Nairobi.
A cinematic, single-page-app portfolio in black and brushed silver, built around the DC monogram.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router · contact form via a Vercel serverless function.

## Pages

| Route         | Page |
| ------------- | ---- |
| `/`           | Home — letterbox hero, Based in Nairobi (map + skyline), design ↔ code split, featured projects, skills, highlights, "Lights · Camera · Action" |
| `/work`       | All projects on a light table (loupe on desktop), filterable by type |
| `/work/:slug` | A project — screens, overview, stack, live / GitHub links, credits |
| `/about`      | Bio and CV, skills (rack focus), how I build (branching film strip), experience |
| `/contact`    | Fill-in-the-sentence message form with a live clapperboard, and FAQs |

## Editing content

Everything you'd change lives in `src/content/`:

- `projects.ts` — projects, links, screenshots (in `public/images/projects/`), which are featured
- `site.ts` — name, email, phone (empty = hidden), socials, CV file
- `home.ts`, `pages.ts`, `studio.ts` (skills, process, experience, highlights), `contact.ts`

Colours and fonts are tokens at the top of `src/styles/global.css`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

In `npm run dev` the contact form doesn't send (it says so). To test real sending locally, use `vercel dev`
with a `.env.local` (see `.env.example`).

## Deploy (Vercel)

1. Push this folder to its own GitHub repo, then **Add New → Project** in Vercel and import it.
   Vercel reads `vercel.json`: Vite build into `dist/`, page routes fall back to `index.html`, `/api/*` stays as functions.
2. **Settings → Environment Variables** — for the contact form (see `.env.example`):
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optionally `CONTACT_TO`, `CONTACT_FROM`.
   For Gmail: `smtp.gmail.com`, port `465`, your address, and an **App Password**
   (Google Account → Security → 2-Step Verification → App passwords). Redeploy after adding them.
3. Once live, set the site address in social previews if you add a custom domain (`og:image` is `/og-image.png`).
