import type { Project } from '@/types';
import { categoryName } from '@/content/projects';
import { pages } from '@/content/pages';
import { Section } from '@/components/ui/Section';

interface ProjectInfoProps {
  project: Project;
}

/**
 * The project's overview, its links (live site, code), and a small editor-style "project info"
 * panel with the year, type and tech stack. Roles appear in the credits.
 */
export function ProjectInfo({ project }: ProjectInfoProps) {
  const copy = pages.project;
  const { live, github = [] } = project.links ?? {};

  return (
    <Section sheet>
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark">{copy.overview}</p>
          <p className="font-display text-2xl leading-snug sm:text-3xl">{project.overview}</p>

          {/* Links — or a note that it's private */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
              >
                {copy.live}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {github.map((g) => (
              <a
                key={g.url}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                {g.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            {project.private && <p className="text-sm text-muted">{copy.privateNote}</p>}
          </div>
        </div>

        <aside className="md:col-span-4 md:pt-10">
          <div className="rounded-2xl border border-ink/10 bg-mist p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{copy.clipInfo}</p>
            <dl className="divide-y divide-ink/10">
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-sm text-muted">{copy.year}</dt>
                <dd className="font-semibold">{project.year}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-sm text-muted">{copy.category}</dt>
                <dd className="font-semibold">{categoryName(project.categoryId)}</dd>
              </div>
              <div className="py-3">
                <dt className="text-sm text-muted">{copy.stack}</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
