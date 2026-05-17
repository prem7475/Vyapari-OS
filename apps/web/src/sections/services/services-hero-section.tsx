'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Search } from 'lucide-react';

export default function ServicesHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_62%)]" />
        <div className="absolute -top-10 right-[-180px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.20),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <Search className="h-3.5 w-3.5" />
              Browse services with clear pricing, timelines and document checklists
            </motion.div>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Services that run on clean workflows.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Pick a service, upload documents once, track progress with real updates, and get completion-ready records.
              Built for India-first business operations.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                Start onboarding
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <div className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Document verification + progress tracking included
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B1020]"
            >
              <div className="text-sm font-semibold text-slate-900 dark:text-white">What you get</div>
              <div className="mt-4 space-y-3">
                <Bullet title="Pricing plans" desc="Starter, Business, Priority Processing" />
                <Bullet title="Timelines" desc="Clear ETAs and operational tracking" />
                <Bullet title="Required documents" desc="Checklist that reduces rework" />
                <Bullet title="Support" desc="Chat-first operations support" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-black/20">
      <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
        <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{desc}</div>
      </div>
    </div>
  );
}

