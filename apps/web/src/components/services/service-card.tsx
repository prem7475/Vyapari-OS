'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BadgeIndianRupee,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Leaf,
  ShieldCheck,
  Store,
  Tags,
  Truck,
} from 'lucide-react';
import clsx from 'clsx';

import type { Service } from '../../modules/services/data/services';

const iconBySlug: Record<string, React.ComponentType<{ className?: string }>> = {
  'gst-registration': FileCheck2,
  'fssai-license': Leaf,
  'trademark-registration': Tags,
  'udyam-msme-registration': ShieldCheck,
  'swiggy-zomato-onboarding': Truck,
  'business-bank-account-setup': BadgeIndianRupee,
  'compliance-filing': Store,
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconBySlug[service.slug] ?? FileCheck2;
  const primaryTimeline = service.timelines.business;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(index * 0.03, 0.18) }}
      className="group"
    >
      <Link
        href={`/services/${service.slug}`}
        className="relative block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-[#0B1020] dark:hover:bg-white/10"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl" />
          <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-cyan-500/10 blur-2xl" />
        </div>

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {service.title}
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {service.categories.join(' • ')}
                </div>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <Clock3 className="h-3.5 w-3.5" />
              {primaryTimeline}
            </span>
          </div>

          <div className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {service.shortDescription}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {service.badges.slice(0, 3).map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-black/20">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">Popular plan</div>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">
                {service.pricing.find((p) => p.recommended)?.priceLabel ?? service.pricing[0].priceLabel}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">Includes</div>
              <span className="inline-flex items-center gap-1 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Verification + tracking
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-slate-500 dark:text-slate-400">View details</div>
            <span
              className={clsx(
                'grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 transition group-hover:translate-x-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white',
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

