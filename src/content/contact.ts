/** Contact page copy: the fill-in-the-script sentence, its blanks, and FAQs. */

export type ScriptFieldName = 'name' | 'type' | 'date' | 'location' | 'budget' | 'idea' | 'email';

/** The sentence, in order: plain text pieces and blanks (fields). Edit the wording here. */
export const script: ({ text: string } | { field: ScriptFieldName })[] = [
  { text: 'Hi Dennis, I’m ' },
  { field: 'name' },
  { text: '. I need ' },
  { field: 'type' },
  { text: ' for ' },
  { field: 'location' },
  { text: ', ideally by ' },
  { field: 'date' },
  { text: '. The budget is ' },
  { field: 'budget' },
  { text: '. In a line: ' },
  { field: 'idea' },
  { text: '. Reach me at ' },
  { field: 'email' },
  { text: '.' },
];

interface TextBlank {
  kind: 'text' | 'email';
  label: string;
  placeholder: string;
  required?: boolean;
}
interface SelectBlank {
  kind: 'select';
  label: string;
  placeholder: string;
  required?: boolean;
  options: string[];
}

export const blanks: Record<ScriptFieldName, TextBlank | SelectBlank> = {
  name: { kind: 'text', label: 'Your name', placeholder: 'your name', required: true },
  type: {
    kind: 'select',
    label: 'What you need',
    placeholder: 'something',
    required: true,
    options: ['a website', 'a web app', 'a SaaS product', 'help with an existing app', 'AI training or data work', 'something else'],
  },
  location: { kind: 'text', label: 'Who it’s for', placeholder: 'my business' },
  date: { kind: 'text', label: 'When', placeholder: 'next month' },
  budget: {
    kind: 'select',
    label: 'Budget',
    placeholder: 'still open',
    // Rough ranges — adjust to your pricing
    options: ['under KES 50k', 'KES 50k – 150k', 'KES 150k – 500k', 'over KES 500k', 'still open'],
  },
  idea: { kind: 'text', label: 'The idea in a line', placeholder: 'a salon booking app' },
  email: { kind: 'email', label: 'Your email', placeholder: 'you@email.com', required: true },
};

export const contact = {
  eyebrow: 'Contact',
  replyNote: 'I reply within a day.',
  send: 'Send it',
  sending: 'Sending…',
  missing: 'Fill in the highlighted blanks so I know who to get back to.',
  invalidEmail: 'That email doesn’t look right — check it so I can reply.',
  failed: 'That didn’t send. Please try again, or email me directly.',
  pick: { sheet: 'Contact sheet', hint: 'Circle one' },
  slate: { prod: 'Project', scene: 'For', date: 'Due', take: 'Take', director: 'Client' },
  success: {
    kicker: 'And…',
    title: 'Action.',
    body: (name: string) => `Got your message${name ? `, ${name}` : ''}. I’ll be in touch within a day.`,
    again: 'Write another',
    devNote: 'Local preview — nothing was actually sent. Messages are delivered once the site is deployed on Vercel.',
  },
  direct: { email: 'Email', whatsapp: 'WhatsApp', phone: 'Call' },
  faq: { eyebrow: 'Good to know', title: 'Before you ask.' },
};

export const faqs = [
  {
    question: 'What kind of projects do you take on?',
    answer: 'Websites, web apps and SaaS products — from a first design to a live deployment — plus fixes for existing apps: broken builds, database issues and hosting problems.',
  },
  {
    question: 'How long does a project take?',
    answer: 'A business website usually takes one to three weeks; a full web app depends on its scope. You get a clear timeline before any work starts.',
  },
  {
    question: 'What happens after I get in touch?',
    answer: 'I read your message, then we talk through the idea, the scope and the budget before anything is agreed.',
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes — I’m in Nairobi (EAT) and work with clients in Kenya and remotely, in English or Kiswahili.',
  },
];
