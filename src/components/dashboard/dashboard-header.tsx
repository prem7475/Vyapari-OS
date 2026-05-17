import { Bell, ChevronDown, Sparkles } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-5 rounded-[32px] border border-white/10 bg-slate-950/80 px-6 py-5 shadow-xl shadow-slate-950/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Dashboard</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold text-white">Control center</h1>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
            <Sparkles className="h-4 w-4" /> Operational
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">Everything your team needs to manage requests, documents, payments and support in one premium workspace.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
          <Bell className="h-4 w-4 text-slate-300" /> 4 new alerts
        </button>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-slate-950/50 transition hover:brightness-110">
          Today
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
