// app/page.tsx
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur shadow-sm">
        <div className="px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                <Sparkles size={14} className="text-slate-700" />
                Interactive robotics diagnostics
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                Robotics Motion Planning
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                Enterprise-grade UI for kinematics and trajectory generation.
                Explore joint-space LSPB planning, live Jacobian diagnostics, and
                chart scrubbing—all in your browser.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/viz/lspb-manipulator"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
                >
                  Launch Visualizer <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  href="/viz/lspb-manipulator"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                      <Activity size={18} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Planar 3‑DoF Visualizer
                      </div>
                      <div className="text-xs text-slate-600">
                        LSPB trajectories + Jacobian diagnostics
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <ShieldCheck size={18} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Production-minded
                      </div>
                      <div className="text-xs text-slate-600">
                        Clean UX, consistent layout, predictable navigation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Modules</h2>
            <p className="text-sm text-slate-600">
              Start with the manipulator trajectory dashboard.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/viz/lspb-manipulator"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10">
                  <Activity size={18} />
                </span>
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    3‑DoF Planar Manipulator
                  </div>
                  <div className="text-sm text-slate-600">
                    LSPB planning + inverse kinematics
                  </div>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="text-slate-400 group-hover:text-slate-700 transition-colors"
              />
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Click on the workspace to set a target point. The dashboard
              generates a smooth joint-space trajectory and displays real-time
              diagnostics.
            </p>
          </Link>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-6 text-slate-600">
            <div className="text-sm font-semibold text-slate-900">
              Future visualization
            </div>
            <p className="mt-2 text-sm">
              Reserved for additional planners, manipulators, and test suites.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
