'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Building2, CheckCircle2, LockKeyhole, Sparkles } from 'lucide-react';

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerHint,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerHint?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070A12] dark:text-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-stretch gap-0 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-14">
        <div className="relative hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-[#0B1020] dark:shadow-[0_40px_120px_rgba(0,0,0,0.55)] lg:col-span-6 lg:block">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.24),transparent_62%)]" />
            <div className="absolute -bottom-36 -left-36 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_60%)]" />
          </div>

          <div className="relative flex h-full flex-col justify-between p-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                  <Building2 className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Vyapari OS</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Business OS for India</div>
                </div>
              </Link>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mt-10 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                Calm workflows for fast-moving businesses.
              </motion.h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Phone-first authentication with operational tracking, a secure vault, and predictable timelines - designed to reduce follow-ups and paperwork chaos.
              </p>

              <div className="mt-8 grid gap-3">
                <FeatureRow icon={LockKeyhole} title="Security-first" desc="OTP + session controls with verification checks." />
                <FeatureRow icon={BadgeCheck} title="Trustworthy ops" desc="Transparent steps and clear next actions." />
                <FeatureRow icon={CheckCircle2} title="Built for speed" desc="Upload once. Reuse across workflows." />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Founder feedback</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Operations experience</div>
                  </div>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  4.9/5
                </span>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                "Finally, a workflow that feels calm. I can see what's pending, what's next, and when it will finish - without chasing updates."
              </div>
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">Aditi - DineCraft Foods</div>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-10">
          <div className="mx-auto w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-7"
            >
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Welcome to Vyapari OS</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>
              </div>

              <div className="mt-7">
                <AnimatePresence mode="wait">{children}</AnimatePresence>
              </div>

              {footerHint ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:bg-black/20 dark:text-slate-300">
                  {footerHint}
                </div>
              ) : null}
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Secure, phone-first onboarding
              </div>
              <Link className="hover:underline" href="/privacy">
                Privacy &amp; security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
        <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{desc}</div>
      </div>
    </div>
  );
}
