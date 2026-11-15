import { home } from '@/content/home';
import { categoryName, featuredProjects } from '@/content/projects';
import { cursorLabels } from '@/content/site';
import { Link } from '@/components/ui/TransitionLink';
import { StackPanel } from '@/components/ui/StackPanel';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Project } from '@/types';

const scene = (i: number) => String(i + 1).padStart(2, '0');

/** Type and year in the style of a film's edge print */
function EdgeCode({ project, i }: { project: Project; i: number }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand sm:text-[11px]">
      Sc. {scene(i)} <span className="text-white/30">▸</span> {categoryName(project.categoryId)} <span className="text-white/30">·</span> {project.year}
    </p>
  );
}

/**
 * Selected work as an overview: every featured project is on screen at once — the newest as a large
 * widescreen frame, the others as numbered scenes beside it — each with its type, year, title and
 * one line about it. Nothing needs a click to be seen; clicking opens the project.
 */
export function WorkSection() {
  const { work } = home;
  const [lead, ...rest] = featuredProjects;

  return (
    <StackPanel tone="dark" label="Selected work">
      <Container className="flex h-full flex-col justify-center gap-6 pb-10 pt-24 sm:gap-8">
        <SectionHeading eyebrow={work.eyebrow} title={work.title} link={work.link} onDark />

        <div role="list" aria-label={work.label} className="grid gap-3 md:grid-cols-12 md:gap-5">
          {/* The lead project: a large widescreen frame */}
          <Link
            role="listitem"
            to={`/work/${lead.slug}`}
            data-cursor={cursorLabels.view}
            className="group relative block aspect-[16/9] overflow-hidden rounded-xl bg-black ring-1 ring-white/10 md:col-span-7 md:aspect-auto md:h-[min(50svh,440px)]"
          >
            <img src={lead.image} alt="" className="h-full w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            {/* Frame corners, like a camera's framing guides */}
            {['left-3 top-3 border-l-2 border-t-2', 'right-3 top-3 border-r-2 border-t-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute h-5 w-5 border-white/60 ${c}`} />
            ))}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <EdgeCode project={lead} i={0} />
              <h3 className="mt-2 text-3xl leading-tight text-white sm:text-4xl">{lead.title}</h3>
              <p className="mt-2 max-w-lg text-sm text-white/80 sm:text-base">{lead.summary}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-brand">
                {work.view}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* The other projects, as numbered scenes */}
          <ul className="grid gap-3 md:col-span-5 md:h-[min(50svh,440px)] md:grid-rows-3 md:gap-4">
            {rest.map((project, i) => (
              <li key={project.slug} className="md:min-h-0">
                <Link
                  to={`/work/${project.slug}`}
                  data-cursor={cursorLabels.view}
                  className="group flex h-full items-center gap-4 rounded-xl bg-white/[0.04] p-2 pr-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08] hover:ring-brand/40"
                >
                  <span className="relative block aspect-[16/10] w-32 shrink-0 overflow-hidden rounded-lg bg-black sm:w-40 md:h-full md:w-auto">
                    <img src={project.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0">
                    <EdgeCode project={project} i={i + 1} />
                    <span className="mt-1 block font-display text-lg leading-tight text-white sm:text-xl">{project.title}</span>
                    <span className="mt-1 hidden text-sm text-white/65 sm:line-clamp-2">{project.summary}</span>
                  </span>
                  <span aria-hidden="true" className="ml-auto shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-brand">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </StackPanel>
  );
}
