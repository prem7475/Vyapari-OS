'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  FileCheck2,
  IndianRupee,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

const trustBadges = [
  { icon: ShieldCheck, text: 'Secure document vault' },
  { icon: BadgeCheck, text: 'Guided compliance workflows' },
  { icon: FileCheck2, text: 'Verified expert operations' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.20),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.24),transparent_62%)]" />
        <div className="absolute -top-10 right-[-180px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_60%)]" />
        <div className="absolute bottom-[-260px] left-[-240px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              AI-powered workflows + human ops support for Indian businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Launch and manage your business in one place.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              Vyapari OS helps Indian businesses handle registrations, compliance, onboarding, and operations — without
              paperwork chaos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
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
                Book Demo
              </Link>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-200">No paperwork chaos.</span> Track every
                step, end-to-end.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.22 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {trustBadges.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/70 px-3 py-3 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <b.icon className="h-4 w-4 text-slate-900 dark:text-white" />
                  <span className="text-xs leading-tight">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(2,6,23,0.18)] dark:border-white/10 dark:bg-[#0B1020] dark:shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.10),rgba(34,211,238,0.08),rgba(14,165,233,0.06))] dark:bg-[linear-gradient(120deg,rgba(99,102,241,0.16),rgba(34,211,238,0.10),rgba(14,165,233,0.08))]" />
                <div className="relative p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold tracking-tight">Operations Dashboard</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Real-time status • Verified tasks</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <MetricCard
                      title="Active Requests"
                      value="6"
                      delta="+2 today"
                      icon={BarChart3}
                      tone="indigo"
                    />
                    <MetricCard
                      title="Estimated Savings"
                      value="₹18,400"
                      delta="last 30 days"
                      icon={IndianRupee}
                      tone="cyan"
                    />
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Work Queue</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Today</div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <QueueRow label="GST Registration • Documents pending" status="Awaiting upload" dot="amber" />
                      <QueueRow label="FSSAI • Under review" status="In progress" dot="indigo" />
                      <QueueRow label="Udyam • Completed" status="Done" dot="emerald" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <FloatingCard
                className="left-[-10px] top-10 hidden sm:block"
                delay={0.15}
                icon={FileCheck2}
                title="Checklist"
                subtitle="Auto-verified docs"
                chip="2 pending"
              />
              <FloatingCard
                className="bottom-10 right-[-12px] hidden sm:block"
                delay={0.22}
                icon={ShieldCheck}
                title="Vault"
                subtitle="Encrypted storage"
                chip="Secure"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  delta: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: 'indigo' | 'cyan';
}) {
  const toneClass =
    tone === 'indigo'
      ? 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200'
      : 'bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-600 dark:text-slate-300">{title}</div>
        <span className={clsx('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs', toneClass)}>
          <Icon className="h-3.5 w-3.5" />
          {delta}
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Updated moments ago</div>
    </div>
  );
}

function QueueRow({
  label,
  status,
  dot,
}: {
  label: string;
  status: string;
  dot: 'amber' | 'indigo' | 'emerald';
}) {
  const dotClass =
    dot === 'amber'
      ? 'bg-amber-500'
      : dot === 'indigo'
        ? 'bg-indigo-500'
        : 'bg-emerald-500';
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 shadow-sm dark:bg-black/20">
      <div className="min-w-0">
        <div className="truncate text-xs font-medium text-slate-900 dark:text-white">{label}</div>
        <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{status}</div>
      </div>
      <span className={clsx('h-2 w-2 shrink-0 rounded-full', dotClass)} />
    </div>
  );
}

function FloatingCard({
  className,
  delay,
  icon: Icon,
  title,
  subtitle,
  chip,
}: {
  className: string;
  delay: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  chip: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={clsx('absolute z-10', className)}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-52 rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-[0_16px_40px_rgba(2,6,23,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
              <Icon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">{title}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{subtitle}</div>
            </div>
          </div>
          <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            {chip}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

