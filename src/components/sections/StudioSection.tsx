import { home } from '@/content/home';
import { StackPanel } from '@/components/ui/StackPanel';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SplitFrame } from '@/components/media/SplitFrame';

/** What I do in one idea — a frame split between its design and its code — and the three parts, at a glance. */
export function StudioSection() {
  const { studio } = home;
  return (
    <StackPanel tone="light" label="What I do">
      <Container className="grid h-full items-center gap-10 pb-10 pt-24 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionHeading eyebrow={studio.eyebrow} title={studio.title} mark={studio.mark} body={studio.body} link={studio.link} />

          {/* What I do, at a glance */}
          <ol className="mt-8 space-y-3 border-t border-ink/10 pt-6">
            {studio.points.map((point, i) => (
              <li key={point.title} className="flex gap-4">
                <span className="mt-0.5 font-mono text-xs font-semibold text-brand-dark">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-display text-lg leading-tight">{point.title}</span>
                  <span className="block text-sm text-muted">{point.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <SplitFrame
          src="/images/projects/livorapulse.webp"
          alt="LivoraPulse, a wellness app I designed and built"
          labels={studio.split}
          className="aspect-video w-full md:col-span-7 md:max-h-[64svh] md:aspect-auto md:h-[64svh]"
        />
      </Container>
    </StackPanel>
  );
}
