/** Homepage copy. Keep every block short — one heading, one or two sentences. */
export const home = {
  hero: {
    // Each line: small lead word + big word. Each big word gets its own effect: framed, pulsing, typed in.
    lines: [
      { lead: 'I', word: 'Design' },
      { lead: 'I', word: 'Build' },
      { lead: 'I', word: 'Ship' },
    ],
    intro: 'Dennis Cira Mwendia — a full-stack developer and AI training specialist in Nairobi, building web apps with React, TypeScript, Node.js and PostgreSQL.',
    primary: { label: 'See my work', to: '/work' },
    showreel: {
      /** Optional background video (e.g. '/videos/reel.mp4'); without one, `image` is shown */
      video: '',
      /** The still shown behind the title (empty = the first project's screenshot) */
      image: '/images/hero-brushed.svg',
      label: 'Portfolio',
      year: '2026',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
    },
  },
  place: {
    eyebrow: 'Where I work',
    title: 'Based in Nairobi.',
    mark: { word: 'Nairobi', type: 'underline' },
    subtitle: 'Working with clients in Kenya — and remotely, anywhere.',
    body: 'Native Kiswahili speaker, fluent in English and intermediate in French — with a mathematics background behind the code.',
    link: { label: 'About me', to: '/about' },
  },
  studio: {
    eyebrow: 'What I do',
    title: 'Every screen, designed and built.',
    mark: { word: 'built', type: 'underline' },
    body: 'From first design to live deployment: I build the interface people use and the server behind it — then ship it and keep it running.',
    link: { label: 'How I work', to: '/about' },
    /** What I do, at a glance */
    points: [
      { title: 'Front end', body: 'React and TypeScript interfaces, fast on every screen.' },
      { title: 'Back end', body: 'Node.js APIs, PostgreSQL data, auth and payments.' },
      { title: 'Ship & run', body: 'Deployed on Vercel, Netlify or Render — and kept healthy.' },
    ],
    split: { picture: 'Design', sound: 'Code', hint: 'Move across the frame', hintTouch: 'Drag across the frame', handle: 'Design and code split' },
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Projects I’ve shipped.',
    link: { label: 'See all projects', to: '/work' },
    view: 'View project',
    label: 'Featured projects',
  },
  services: {
    eyebrow: 'Skills',
    title: 'The stack I work in.',
    link: { label: 'All skills', to: '/about#skills' },
  },
  clients: {
    eyebrow: 'Highlights',
    title: 'Work that’s out in the world.',
    logosLabel: 'Technologies I use',
  },
  cta: {
    /** Headline of the smaller closing block on inner pages (components/sections/ClosingCta) */
    title: 'Have a project in mind?',
    lights: 'Lights.',
    camera: 'Camera.',
    action: 'Action',
    body: 'Tell me what you’re building — I reply within a day.',
    primary: { label: 'Hire me', to: '/contact' },
    reelLabel: 'Screens from my projects',
  },
} as const;
