'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import clsx from 'clsx';

import type { PricingPlan } from '../../modules/services/data/services';

export default function PricingCard({
  plan,
  ctaHref,
  ctaLabel,
}: {
  plan: PricingPlan;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.48, ease: 'easeOut' }}
      className={clsx(
        'relative overflow-hidden rounded-3xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(2,6,23,0.10)]',
        plan.recommended
          ? 'border-slate-200 bg-white dark:border-white/10 dark:bg-[#0B1020]'
          : 'border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5',
      )}
    >
      {plan.recommended && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl" />
          <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-cyan-500/10 blur-2xl" />
        </div>
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{plan.name}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{plan.priceLabel}</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{plan.timelineLabel}</div>
          </div>
          {plan.recommended ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended
            </span>
          ) : (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {plan.supportLabel}
            </span>
          )}
        </div>

        <div className="mt-5 space-y-3">
          {plan.bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <Link
            href={ctaHref}
            className={clsx(
              'group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition',
              plan.recommended
                ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
            )}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">{plan.supportLabel}</div>
      </div>
    </motion.div>
  );
}

