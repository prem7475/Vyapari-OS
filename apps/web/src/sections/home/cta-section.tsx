'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, ShieldCheck } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                Secure workflows • Clear timelines • Real operations support
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Ready to run your business like a modern startup?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Start with one service and experience clean workflows, a secure vault, and operational tracking that keeps
                you in control — without follow-up fatigue.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  Get Started
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
                Typical setup: <span className="font-medium text-slate-700 dark:text-slate-200">15 minutes</span>. Real
                value: tracked outcomes from day one.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

