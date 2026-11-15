import type { Client, FlowStage, Milestone, Service, Testimonial } from '@/types';

/*
 * About-page content (and the homepage's skills and highlights). The export names come from the
 * site this was built from: "services" are skill groups, "reelFlow" is how I build, "milestones"
 * is experience, "testimonials" are highlights and "clients" are the technologies strip.
 */

export const servicesCopy = {
  eyebrow: 'Skills',
  title: 'Five toolkits, one developer.',
  hint: 'Move over a group to pull focus',
  hintTouch: 'Tap a group to pull focus',
  includes: 'Includes',
  /** Lens focus-scale markings, one per group, near to far */
  distances: ['0.5m', '1m', '2m', '5m', '∞'],
};

/** Skill groups, in order. Shown on the About page (#skills); the homepage lists them with a one-line summary. */
export const services: Service[] = [
  {
    id: 'front-end',
    title: 'Front end',
    summary: 'Interfaces that are fast, responsive and easy to use.',
    includes: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'back-end',
    title: 'Back end',
    summary: 'APIs and services with validation, auth and clear errors.',
    includes: ['Node.js', 'Express', 'Prisma', 'REST APIs', 'FastAPI', 'Spring Boot'],
  },
  {
    id: 'data-hosting',
    title: 'Data & hosting',
    summary: 'Databases, caching and deployments that stay up.',
    includes: ['PostgreSQL', 'Redis', 'Supabase', 'MySQL', 'Git', 'Vercel', 'Netlify', 'Render', 'Cloudflare Workers'],
  },
  {
    id: 'ai-data',
    title: 'AI training & more',
    summary: 'Rating and reviewing AI outputs, plus the languages behind the tools.',
    includes: ['AI output evaluation', 'Data annotation', 'Python', 'Java', 'SQL'],
  },
  {
    id: 'languages',
    title: 'Spoken languages',
    summary: 'Working comfortably with clients in three languages.',
    includes: ['Kiswahili (native)', 'English (fluent)', 'French (intermediate)'],
  },
];

export const reelFlowCopy = {
  eyebrow: 'How I build',
  title: 'One product, two halves.',
  intro: 'Every project starts as one plan. Then the interface and the server are built side by side — and meet again when it ships.',
  hint: 'Click a frame to project it — or flip between front end and back end.',
  play: 'Run the reel',
  pause: 'Pause',
  replay: 'Run it again',
  branches: { shared: 'Plan', picture: 'Front end', sound: 'Back end' },
  end: { label: 'Ship', body: 'Front end and back end meet in production: deployed, monitored and handed over — on Vercel, Netlify or Render.' },
};

/**
 * How I build, shown on the About page as frames on a branching film strip.
 * Order matters: the reel runs through the frames in this order (see lib/filmFrames.ts for where each sits).
 */
export const reelFlow: FlowStage[] = [
  {
    id: 'brief',
    label: 'Brief',
    branch: 'shared',
    title: 'It starts with the problem.',
    body: 'What are we solving, for whom, and how will we know it worked? We agree the scope before any code is written.',
    includes: ['Requirements', 'Scope', 'Timeline'],
  },
  {
    id: 'design',
    label: 'Design',
    branch: 'shared',
    title: 'Design the flow.',
    body: 'User flows, wireframes and a visual direction — so it feels right before it’s built.',
    includes: ['User flows', 'Wireframes', 'UI design'],
  },
  {
    id: 'architecture',
    label: 'Foundations',
    branch: 'shared',
    title: 'Pick the right foundations.',
    body: 'The stack, the data model and the hosting, chosen for the job — then the repo and environments set up.',
    includes: ['Data model', 'Tech stack', 'Git & environments'],
  },
  {
    id: 'interface',
    label: 'Interface',
    branch: 'picture',
    title: 'Build the interface.',
    body: 'Responsive React components in TypeScript and Tailwind CSS, fast and accessible on every screen.',
    includes: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'polish',
    label: 'Polish',
    branch: 'picture',
    title: 'Polish every interaction.',
    body: 'Motion, loading and empty states, and the small details that make it feel finished — checked on real devices.',
    includes: ['Animation', 'Accessibility', 'Performance'],
  },
  {
    id: 'api',
    label: 'API',
    branch: 'sound',
    title: 'Build the API.',
    body: 'Node.js and Express services with validation, authentication and role-based access.',
    includes: ['Node.js', 'REST APIs', 'Auth & roles'],
  },
  {
    id: 'data',
    label: 'Data',
    branch: 'sound',
    title: 'Model the data.',
    body: 'PostgreSQL with Prisma, Redis where speed counts, and migrations that run safely in production.',
    includes: ['PostgreSQL', 'Prisma', 'Redis'],
  },
];

export const milestonesCopy = { eyebrow: 'Experience', title: 'Where I’ve been building.' };

export const milestones: Milestone[] = [
  { year: 'Now', title: 'BSc Mathematics & Computer Science, JKUAT' },
  { year: 'May 2026', title: 'Freelance full-stack developer — Nexus' },
  { year: 'Aug 2026', title: 'AI training contractor — remote' },
  { year: 'Sep 2026', title: 'Web developer — AV Productions' },
];

/** Technologies shown in the homepage strip (names stand in for logos) */
export const clients: Client[] = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Prisma',
  'Redis',
  'Tailwind CSS',
  'Vite',
  'Supabase',
  'Python',
  'Vercel',
].map((name) => ({ name }));

/** Highlights from real work, shown in laurels on the homepage. Swap in client quotes as they come. */
export const testimonials: Testimonial[] = [
  {
    quote: 'LivoraPulse runs in production with about 30 real users — designed, built, deployed and maintained end to end.',
    pull: '~30 live users',
    name: 'LivoraPulse',
    role: 'Product',
  },
  {
    quote: 'The JKUAT French Club’s leadership elections ran on a portal I built, with 20 applicants.',
    pull: '20 applicants',
    name: 'JKUAT French Club',
    role: 'Client',
  },
  {
    quote: 'An end-to-end M-Pesa STK Push payment flow, integrated with Safaricom’s Daraja API in the sandbox.',
    pull: 'M-Pesa STK Push',
    name: 'PAYVORA',
    role: 'Prototype',
  },
  {
    quote: 'Grade A in KCSE Mathematics — now studying Mathematics and Computer Science at JKUAT.',
    pull: 'KCSE Maths: A',
    name: 'KCSE',
    role: 'Mathematics',
  },
];
