'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ServiceProcessStep({
  index,
  title,
  description,
  eta,
  active,
}: {
  index: number;
  title: string;
  description: string;
  eta: string;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className={clsx(
        'relative rounded-3xl border p-5 shadow-sm transition',
        active
          ? 'border-slate-200 bg-white dark:border-white/10 dark:bg-white/5'
          : 'border-slate-200 bg-white/80 dark:border-white/10 dark:bg-black/20',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <span className="text-sm font-semibold">{index + 1}</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{eta}</div>
          </div>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          Step
        </span>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</div>
    </motion.div>
  );
}

