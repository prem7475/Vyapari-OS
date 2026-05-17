'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock3 } from 'lucide-react';
import type { RequestItem } from '../../modules/dashboard/types/dashboard.types';
import RequestStatusBadge from './request-status-badge';

interface RequestCardProps {
  request: RequestItem;
}

export default function RequestCard({ request }: RequestCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="group rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-slate-950/20 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{request.service}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{request.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{request.client}</p>
        </div>
        <RequestStatusBadge status={request.status} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Progress</p>
          <p className="mt-2 text-lg font-semibold text-white">{request.progress}%</p>
        </div>
        <div className="rounded-3xl bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">ETA</p>
          <p className="mt-2 text-lg font-semibold text-white">{request.estimatedCompletion}</p>
        </div>
        <div className="rounded-3xl bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Amount</p>
          <p className="mt-2 text-lg font-semibold text-white">{request.amount}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-900/60 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Clock3 className="h-4 w-4 text-slate-400" />
          <span>Submitted on {request.submittedAt}</span>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-300">
          View details
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.article>
  );
}
