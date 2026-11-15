import type { NavItem, SiteInfo } from '@/types';

/** Personal details used across the site (header, footer, contact page). */
export const site: SiteInfo = {
  name: 'Dennis Cira Mwendia',
  tagline: 'Full-Stack Developer',
  email: 'dmwendia30@gmail.com',
  // Left empty on purpose: add the number here to show it in the footer and contact page
  phone: '',
  location: 'Nairobi, Kenya',
  // Links with an empty url are hidden
  socials: [
    { platform: 'GitHub', url: 'https://github.com/donnycee-rgb' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/dennis-mwendia-90b28331a' },
  ],
};

/** The downloadable CV (in /public) */
export const cv = {
  label: 'Download CV',
  href: '/Dennis_Cira_Mwendia_CV.pdf',
  fileName: 'Dennis_Cira_Mwendia_CV.pdf',
};

/** Footer copy. The clock shows Nairobi time; credits list artwork that needs attribution. */
export const footer = {
  tagline: 'Software that ships,',
  taglineAccent: 'designed and built with care.',
  explore: 'Explore',
  contact: 'Get in touch',
  clock: { city: 'Nairobi', timeZone: 'Africa/Nairobi', zone: 'EAT' },
  rewind: 'Rewind',
  rights: 'All rights reserved.',
  credits: 'Credits',
  /** Artwork whose licence asks for a credit (none at the moment) */
  creditsList: [] as { text: string; url: string }[],
  wordmark: 'DENNIS CIRA',
};

/** Labels shown in the viewfinder cursor over project imagery (desktop). */
export const cursorLabels = {
  view: 'View',
  next: 'Next',
  load: 'Load',
};

/** Main navigation, in display order. */
export const navigation: NavItem[] = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/** The header's call-to-action button */
export const headerCta = { label: 'Hire me', to: '/contact' };
