'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock3, FileText, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

import type { Service } from '../../modules/services/data/services';

export default function ServiceDetailHero({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[560px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.24),transparent_62%)]" />
        <div className="absolute -top-10 right-[-220px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <Clock3 className="h-3.5 w-3.5" />
                Typical timeline: {service.timelines.business}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verification-first workflow
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
              className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              {service.longDescription}
            </motion.p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/signup?service=${encodeURIComponent(service.slug)}`}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                Start Process
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                View pricing
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {service.highlights.slice(0, 3).map((h) => (
                <div
                  key={h}
                  className="rounded-2xl border border-slate-200/70 bg-white/70 px-3 py-3 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    <span className="text-xs leading-tight">{h}</span>
                  </div>
                </div>
              ))}
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
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">What’s included</div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  Service workflow
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <InfoRow title="Document checklist" value="Upload once, reuse" icon={FileText} />
                <InfoRow title="Verification" value="Clarity + completeness checks" icon={ShieldCheck} />
                <InfoRow title="Timeline view" value="Clear next actions + updates" icon={Clock3} />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
                <div className="text-xs text-slate-600 dark:text-slate-300">Starting at</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {service.pricing[0].priceLabel}
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{service.timelines.starter}</div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/signup?service=${encodeURIComponent(service.slug)}`}
                  className={clsx(
                    'group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
                  )}
                >
                  Start now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-black/20">
      <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
        <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{value}</div>
      </div>
    </div>
  );
}

