'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, CircleDot, Clock, Loader2 } from 'lucide-react';
import type { RequestStage } from '../../modules/dashboard/types/dashboard.types';

interface RequestTimelineProps {
  timeline: RequestStage[];
}

const iconMap = {
  submitted: CircleDot,
  under_review: Loader2,
  documents_pending: Clock,
  processing: Loader2,
  approved: CheckCircle2,
  completed: CheckCircle2,
  rejected: CircleDot,
};

export default function RequestTimeline({ timeline }: RequestTimelineProps) {
  return (
    <div className="space-y-6">
      {timeline.map((step, index) => {
        const Icon = iconMap[step.status] ?? CircleDot;
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/10"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800/90 text-slate-200 ring-1 ring-white/10">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-base font-semibold text-white">{step.title}</h4>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{step.date}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.note}</p>
              </div>
            </div>
            {index < timeline.length - 1 ? <div className="absolute left-6 top-16 h-14 w-px bg-slate-700/70" /> : null}
          </motion.div>
        );
      })}
    </div>
  );
}
