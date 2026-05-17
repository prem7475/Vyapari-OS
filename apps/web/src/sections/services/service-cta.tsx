'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, ShieldCheck } from 'lucide-react';

import type { Service } from '../../modules/services/data/services';

export default function ServiceCta({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-[0_30px_90px_rgba(2,6,23,0.12)] dark:border-white/10 dark:bg-[#0B1020] dark:shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:px-10"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-indigo-500/12 blur-2xl dark:bg-indigo-500/18" />
            <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-cyan-500/12 blur-2xl dark:bg-cyan-500/18" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified workflow • Clear next actions • Operational tracking
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Start {service.title} with a clean, tracked process.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Upload documents once, choose a plan, and track each step with real updates. Built for speed and trust —
                without paperwork chaos.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href={`/signup?service=${encodeURIComponent(service.slug)}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  Start Process
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Demo
                </Link>
              </div>

              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Typical timeline: <span className="font-medium text-slate-700 dark:text-slate-200">{service.timelines.business}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <StickyCta slug={service.slug} title={service.title} />
    </section>
  );
}

function StickyCta({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/85 p-3 backdrop-blur dark:border-white/10 dark:bg-[#070A12]/75 lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Start a tracked workflow in minutes</div>
        </div>
        <Link
          href={`/signup?service=${encodeURIComponent(slug)}`}
          className="shrink-0 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          Start
        </Link>
      </div>
    </div>
  );
}

