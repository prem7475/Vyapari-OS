'use client';

import { motion } from 'framer-motion';
import { FileText, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

export default function DocumentBadge({
  label,
  notes,
  tone = 'default',
}: {
  label: string;
  notes?: string;
  tone?: 'default' | 'sensitive' | 'recommended';
}) {
  const toneClasses =
    tone === 'sensitive'
      ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-200'
      : tone === 'recommended'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200'
        : 'border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className={clsx('rounded-2xl border px-4 py-4 shadow-sm', toneClasses)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold">{label}</div>
            {notes ? <div className="mt-0.5 text-xs opacity-80">{notes}</div> : null}
          </div>
        </div>
        <ShieldCheck className="h-4 w-4 opacity-70" />
      </div>
    </motion.div>
  );
}

