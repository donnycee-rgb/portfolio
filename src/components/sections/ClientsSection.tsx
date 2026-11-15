import { useRef } from 'react';
import { home } from '@/content/home';
import { clients, testimonials } from '@/content/studio';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { StackPanel } from '@/components/ui/StackPanel';
import { Container } from '@/components/ui/Container';
import { Laurel } from '@/components/ui/Laurel';
import type { Client } from '@/types';

/** A client's logo (white, or in its own colours), or its name as a stand-in when there's no logo file */
function ClientMark({ client, hidden = false }: { client: Client; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className="flex h-14 shrink-0 items-center px-8 sm:h-16 sm:px-12">
      {client.logo ? (
        // Wordmarks turn white; emblems keep their own colours, a touch muted until hovered
        <img
          src={client.logo}
          alt={hidden ? '' : client.name}
          loading="lazy"
          className={`w-auto transition-opacity duration-300 hover:opacity-100 ${
            client.tone === 'colour' ? 'h-12 opacity-80 sm:h-14' : 'h-10 opacity-75 [filter:brightness(0)_invert(1)] sm:h-11'
          }`}
        />
      ) : (
        <span className="whitespace-nowrap font-display text-lg italic text-white/45 transition-colors duration-300 hover:text-white">{client.name}</span>
      )}
    </li>
  );
}

/**
 * Clients like the foot of a film poster: every review is shown at once — a festival laurel with its
 * short quote, and the full review beneath it — with the clients' logos running along underneath.
 * On phones the reviews sit in a row to swipe through.
 */
export function ClientsSection() {
  const { clients: copy } = home;
  const ref = useRef<HTMLDivElement>(null);
  const grown = useInView(ref, 0.4);
  const reduced = useReducedMotion();

  return (
    <StackPanel tone="dark" label="Highlights">
      <div ref={ref} className="flex h-full flex-col justify-center pb-10 pt-24 text-center">
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand">{copy.eyebrow}</p>
          <h2 className="text-4xl leading-tight sm:text-5xl">{copy.title}</h2>
        </Container>

        {/* Every review: a laurel with its short quote, and the full review beneath */}
        <Container className="mt-6 sm:mt-8">
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
            {testimonials.map((t, i) => (
              <li key={t.name} className="group w-[72vw] shrink-0 snap-center sm:w-[40vw] lg:w-auto">
                <figure>
                  <Laurel grown={grown} delay={i * 180} className="mx-auto max-w-[15rem] [&_svg]:transition-colors [&_svg]:duration-500 group-hover:[&_svg]:text-brand">
                    <span className="font-display text-base italic leading-tight text-white lg:text-lg">{t.pull}</span>
                  </Laurel>
                  <blockquote className="mt-1 text-sm leading-relaxed text-white/70">“{t.quote}”</blockquote>
                  <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    {t.name} · <span className="text-brand/80">{t.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>

        {/* Logo strip, edge to edge: two copies of the row slide left on a loop; hovering pauses it */}
        <div
          role="group"
          aria-label={copy.logosLabel}
          className="mt-6 border-t border-white/10 pt-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:mt-10 sm:pt-8"
        >
          {reduced ? (
            <ul className="flex flex-wrap justify-center">
              {clients.map((client) => (
                <ClientMark key={client.name} client={client} />
              ))}
            </ul>
          ) : (
            <ul className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
              {/* Each half holds the list twice, so even a short list fills very wide screens without a gap */}
              {[false, true].map((copyOfRow) =>
                [...clients, ...clients].map((client, i) => (
                  <ClientMark key={`${client.name}-${copyOfRow}-${i}`} client={client} hidden={copyOfRow || i >= clients.length} />
                )),
              )}
            </ul>
          )}
        </div>
      </div>
    </StackPanel>
  );
}
