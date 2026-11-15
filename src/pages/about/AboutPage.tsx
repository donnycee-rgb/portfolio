import { useEffect, useState } from 'react';
import { pages } from '@/content/pages';
import { cv, headerCta } from '@/content/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageIntro } from '@/components/sections/PageIntro';
import { ServicesFocus } from '@/components/sections/ServicesFocus';
import { FilmFlow } from '@/components/sections/FilmFlow';
import { Milestones } from '@/components/sections/Milestones';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/LogoMark';

/** The DC monogram, tracing itself in once the page opens */
function DrawnMonogram() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setDrawn(true), 400);
    return () => window.clearTimeout(timer);
  }, []);
  return <LogoMark variant="drawing" drawn={drawn} className="mx-auto w-full max-w-[15rem] sm:max-w-xs lg:max-w-sm" />;
}

/** About: who I am, my skills, how I build, and where I've worked. */
export function AboutPage() {
  const { eyebrow, title, intro, more, mark } = pages.about;
  useDocumentTitle('About');
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title} intro={`${intro} ${more}`} mark={mark} art={<DrawnMonogram />}>
        <a
          href={cv.href}
          download={cv.fileName}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-light"
        >
          {cv.label}
          <span aria-hidden="true">↓</span>
        </a>
        <Button to={headerCta.to} variant="outline-light">
          {headerCta.label}
        </Button>
      </PageIntro>
      <ServicesFocus />
      <FilmFlow />
      <Milestones />
      <ClosingCta />
    </>
  );
}
