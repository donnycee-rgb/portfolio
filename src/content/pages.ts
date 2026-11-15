/** Titles and short intros for each page. Keep intros to one sentence. */
export const pages = {
  home: {
    eyebrow: 'Full-Stack Developer',
    title: 'Software that ships.',
    intro: 'Web apps built and shipped with React, TypeScript, Node.js and PostgreSQL.',
  },
  work: {
    eyebrow: 'Work',
    title: 'Selected projects',
    tableIntro: 'Every project, laid out on the light table. Click a frame to open it.',
    tableIntroTouch: 'Every project, laid out on the light table. Tap a frame to open it.',
    all: 'All',
    openHint: 'Click to open',
  },
  project: {
    back: 'All projects',
    clipInfo: 'Project info',
    overview: 'Overview',
    role: 'What I did',
    year: 'Year',
    category: 'Type',
    stack: 'Built with',
    live: 'Visit the live site',
    privateNote: 'Private client project — no public link or screenshots.',
    stills: 'Screens',
    credits: 'Credits',
    next: 'Next project',
  },
  about: {
    eyebrow: 'About',
    title: 'From first design to live deployment.',
    mark: { word: 'live', type: 'underline' },
    intro:
      'I’m Dennis — a full-stack developer who builds and ships web apps for clients and real users, and an AI training specialist who rates and reviews AI outputs for accuracy and safety.',
    more: 'Native Kiswahili speaker, fluent in English, intermediate in French — with a strong mathematics background behind the code.',
  },
  notFound: {
    eyebrow: '404',
    title: 'This page didn’t ship.',
    intro: 'The page you’re looking for doesn’t exist.',
  },
} as const;
