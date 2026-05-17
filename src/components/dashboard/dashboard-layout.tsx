import type { ReactNode } from 'react';
import DashboardSidebar from './dashboard-sidebar';
import DashboardHeader from './dashboard-header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-slate-900 via-slate-950 to-transparent opacity-80" />
        <div className="relative mx-auto flex min-h-screen max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8">
          <DashboardSidebar />
          <div className="flex min-h-screen flex-1 flex-col gap-6 lg:ml-6">
            <DashboardHeader />
            <main className="flex-1 rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-md">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
