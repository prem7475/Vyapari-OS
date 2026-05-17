'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import clsx from 'clsx';

type Plan = {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'Pay per service',
    subtitle: 'Best for new businesses getting started.',
    features: ['Workflow-based processing', 'Secure document vault', 'Status tracking', 'Basic support'],
  },
  {
    name: 'Business',
    price: '₹999 / month',
    subtitle: 'For teams that want continuous compliance.',
    features: ['Monthly compliance tracking', 'Reminders & timelines', 'Priority support chat', 'Invoices & records'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    subtitle: 'For multi-location businesses & franchises.',
    features: ['Dedicated operations manager', 'Custom workflows', 'Advanced reporting', 'SLA + audit trails'],
  },
];

export default function PricingPreviewSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Simple plans that scale with you
          </motion.div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Transparent pricing. Clear outcomes.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Start with a single service, then grow into continuous compliance and operational support as your business
            scales.
          </p>
        </div>
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          See full pricing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((p, idx) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.04 }}
            className={clsx(
              'relative overflow-hidden rounded-3xl border p-6 shadow-sm transition',
              p.highlight
                ? 'border-slate-200 bg-white shadow-[0_30px_80px_rgba(2,6,23,0.12)] dark:border-white/10 dark:bg-[#0B1020]'
                : 'border-slate-200 bg-white dark:border-white/10 dark:bg-white/5',
            )}
          >
            {p.highlight && (
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-indigo-500/10 blur-2xl" />
                <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-2xl" />
              </div>
            )}
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</div>
                {p.highlight && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{p.price}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.subtitle}</div>
              <div className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <Link
                  href="/signup"
                  className={clsx(
                    'inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition',
                    p.highlight
                      ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                      : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
                  )}
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

