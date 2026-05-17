import Link from 'next/link';
import { Activity, FileText, MessageSquare, Settings, Shield, Wallet, Bell, ClipboardList, HelpCircle } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Activity },
  { href: '/dashboard/requests', label: 'Requests', icon: ClipboardList },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText },
  { href: '/dashboard/payments', label: 'Payments', icon: Wallet },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/support', label: 'Support', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-8 rounded-[32px] border border-white/10 bg-slate-900/95 p-6 backdrop-blur-xl lg:flex">
      <div className="space-y-3">
        <div className="rounded-3xl bg-slate-950/80 px-4 py-5 shadow-sm shadow-slate-950/30">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Vyapari HQ</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Business Command</h2>
          <p className="mt-1 text-sm text-slate-400">Manage requests, documents and payments with premium operations controls.</p>
        </div>
      </div>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-3xl border border-white/5 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white">
            <item.icon className="h-5 w-5 text-slate-400 transition group-hover:text-white" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-800/70 via-slate-900/70 to-slate-950/90 p-4 text-slate-300 shadow-inner shadow-slate-950/20">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div>
            <p className="font-semibold text-white">Workflow status</p>
            <p className="mt-1 text-xs text-slate-400">All systems healthy with low action backlog.</p>
          </div>
          <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-emerald-300">Live</div>
        </div>
      </div>
      <div className="rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-100">Pro tip</p>
        <p className="mt-2 leading-6">Use the Requests module to triage paperwork and approvals before payments, so compliance stays ahead of deadlines.</p>
      </div>
    </aside>
  );
}
