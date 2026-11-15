import type { Category, Project } from '@/types';

export const categories: Category[] = [
  { id: 'client', name: 'Client work' },
  { id: 'product', name: 'Products' },
  { id: 'prototype', name: 'Prototypes' },
];

const shot = (name: string) => `/images/projects/${name}`;

/**
 * Projects, newest and strongest first. The first four with `featured: true` make the homepage
 * overview (the first of them leads, large). Screenshots live in public/images/projects.
 */
export const projects: Project[] = [
  {
    slug: 'av-productions',
    title: 'AV Productions',
    categoryId: 'client',
    summary: 'A cinematic website rebuild for a film and sound studio.',
    overview:
      'The studio’s old site was wordy, hard to navigate and didn’t reflect the brand. I restructured the content into a cleaner site that gives visitors the whole story just by scrolling, with a cinematic identity built around film and sound — hand-drawn SVG animations, a line-art Nairobi skyline that turns into a soundwave, and a fill-in-the-script booking form — plus a Node.js and PostgreSQL back end for the owner’s admin and booking emails.',
    role: ['Brand & UI design', 'Front end', 'Back end', 'Content structure'],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    image: shot('av-productions-table.webp'),
    stills: [shot('av-productions.webp'), shot('av-productions-work.webp'), shot('av-productions-studio.webp'), shot('av-productions-contact.webp'), shot('av-productions-mobile.webp')],
    year: '2026',
    featured: true,
    // TODO: add `live` once the site is deployed
    links: { github: [{ label: 'Code on GitHub', url: 'https://github.com/donnycee-rgb/av-web' }] },
  },
  {
    slug: 'livorapulse',
    title: 'LivoraPulse',
    categoryId: 'product',
    summary: 'A wellness tracking app with about 30 real users.',
    overview:
      'A wellness app that brings activity, food, screen time, focus, mood and eco habits together into one daily LifePulse Score. I designed and built the whole thing and run it in production on Netlify and Render — including fixing real deployment issues: failing database migrations, missing build files and server cold starts.',
    role: ['Product design', 'Full-stack build', 'Deployment & operations'],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Netlify', 'Render'],
    image: shot('livorapulse.webp'),
    stills: [shot('livorapulse-mobile.webp')],
    year: '2025 – now',
    featured: true,
    links: {
      live: 'https://livorapulse.netlify.app',
      github: [
        { label: 'Front end', url: 'https://github.com/donnycee-rgb/livorapulse' },
        { label: 'Back end', url: 'https://github.com/donnycee-rgb/livorapulse_backend' },
      ],
    },
  },
  {
    slug: 'nexus',
    title: 'Nexus',
    categoryId: 'client',
    summary: 'A social media management SaaS, built for a client.',
    overview:
      'A multi-tenant platform for a social media manager. I implemented role-based access control across the stack — API middleware plus a custom usePermission() React hook that hides actions a user isn’t allowed to take — and built workspace creation, a team invite flow with signed single-use links, and a media upload pipeline that can switch storage providers without code changes.',
    role: ['Full-stack build', 'Access control', 'Upload pipeline'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis'],
    image: shot('nexus.svg'),
    stills: [],
    year: '2026',
    featured: true,
    private: true,
  },
  {
    slug: 'jkuat-french-club',
    title: 'JKUAT French Club Leadership Portal',
    categoryId: 'client',
    summary: 'An election application portal used by 20 applicants.',
    overview:
      'The online application portal for the JKUAT French Club’s executive elections. Members could read about each position and the process, then apply — with Google Sheets as the back end, so the club could manage applications without a database to run. It carried the elections for 20 applicants.',
    role: ['Design', 'Front end', 'Google Apps Script back end'],
    stack: ['React', 'Google Apps Script', 'Google Sheets'],
    image: shot('jkuat-french-club.webp'),
    stills: [shot('jkuat-french-club-mobile.webp')],
    year: '2026',
    featured: true,
    // TODO: add the GitHub repository link
    links: { live: 'https://jkuat-french-club-elections.netlify.app' },
  },
  {
    slug: 'payvora',
    title: 'PAYVORA',
    categoryId: 'prototype',
    summary: 'A payments prototype with an end-to-end M-Pesa STK Push flow.',
    overview:
      'A payments prototype that integrates Safaricom’s M-Pesa STK Push (Daraja API) end to end in the sandbox: the app sends the payment request to the customer’s phone, then handles the callback to confirm the result.',
    role: ['Full-stack build', 'Payments integration'],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Supabase', 'Cloudflare Workers', 'M-Pesa Daraja API'],
    image: shot('payvora.svg'),
    stills: [],
    // TODO: fill in the year, and links if it goes public
    year: '—',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? '';

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The project after this one, looping back to the first. */
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
