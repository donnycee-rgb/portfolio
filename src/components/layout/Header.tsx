import { NavLink } from '@/components/ui/TransitionLink';
import { navigation, headerCta } from '@/content/site';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

/**
 * Floating rounded navigation bar, pinned to the top of every page. On phones it keeps just the
 * logo and a compact "Hire me" — the page links live in the bottom dock (MobileDock), within thumb reach.
 */
export function Header() {
  return (
    // Own view-transition layer: stays still during the iris page transition
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4" style={{ viewTransitionName: 'site-header' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl bg-ink/85 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-md sm:px-6 sm:py-3">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-brand' : 'text-white/80 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button to={headerCta.to} className="!min-h-11 shrink-0 !px-4 !py-2 max-sm:!text-xs sm:!px-5 sm:!py-2.5">
          {headerCta.label}
        </Button>
      </div>
    </header>
  );
}
