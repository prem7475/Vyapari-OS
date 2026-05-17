'use client';

import { motion } from 'framer-motion';
import type { DashboardStat } from '../../modules/dashboard/types/dashboard.types';

interface DashboardStatCardProps {
  stat: DashboardStat;
}

export default function DashboardStatCard({ stat }: DashboardStatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/20 ring-1 ring-white/5 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-violet-400 opacity-90" />
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-white">{stat.value}</p>
          <p className="mt-2 text-sm text-slate-400">{stat.description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
          {stat.delta}
        </span>
      </div>
    </motion.article>
  );
}
