export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">Robotics Platform</span>
            <span className="mx-2 text-slate-300">•</span>
            <span>Planar 3‑DoF trajectory planning visualization</span>
          </div>
          <div className="text-xs text-slate-500">
            Built with Next.js + FastAPI • Local demo
          </div>
        </div>
      </div>
    </footer>
  );
}
