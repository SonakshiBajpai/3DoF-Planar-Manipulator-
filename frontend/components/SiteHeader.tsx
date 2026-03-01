import Link from "next/link";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-semibold tracking-tight"
              aria-label="Home"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10">
                <span className="text-sm">RP</span>
              </span>
              <span className="hidden sm:inline text-slate-900">
                Robotics Platform
              </span>
            </Link>

            <span className="hidden lg:inline text-xs text-slate-400">
              Motion Planning & Trajectory Visualization
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" label="Overview" />
            <NavLink href="/viz/lspb-manipulator" label="Visualizer" />
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/viz/lspb-manipulator"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
            >
              Open Visualizer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
