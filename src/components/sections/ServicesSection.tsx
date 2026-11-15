import { home } from '@/content/home';
import { services } from '@/content/studio';
import { Link } from '@/components/ui/TransitionLink';
import { StackPanel } from '@/components/ui/StackPanel';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** The skill groups, each with a line about it. Each links to its place on the About page. */
export function ServicesSection() {
  const { services: copy } = home;

  return (
    <StackPanel tone="mist" label="Skills">
      <Container className="grid h-full items-center gap-10 pb-10 pt-24 md:grid-cols-12 md:gap-16">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} link={copy.link} className="md:col-span-5" />

        <ul className="md:col-span-7">
          {services.map((service, i) => (
            <li key={service.id} className="border-b border-ink/10 first:border-t">
              <Link
                to="/about#skills"
                state={{ service: service.id }}
                className="group flex items-center gap-5 py-3 sm:py-4"
              >
                <span className="text-xs font-semibold tabular-nums text-brand-dark">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">
                  <span className="block font-display text-xl leading-tight transition-colors group-hover:text-brand-dark sm:text-2xl">{service.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{service.summary}</span>
                </span>
                <span aria-hidden="true" className="text-lg text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-brand-dark">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </StackPanel>
  );
}
