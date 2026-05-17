'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, FileUp, Headphones, ListChecks, MousePointerClick, Radar, Wallet } from 'lucide-react';
import clsx from 'clsx';

type Step = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
};

const steps: Step[] = [
  {
    title: 'Select a service',
    desc: 'Pick GST, FSSAI, Trademark and more — with clear requirements upfront.',
    icon: MousePointerClick,
    bullets: ['Choose category', 'See pricing plans', 'Know documents needed'],
  },
  {
    title: 'Upload documents',
    desc: 'Send files once. The vault keeps them organized, verified, and reusable.',
    icon: FileUp,
    bullets: ['Smart checklist', 'Secure storage', 'Preview & rename'],
  },
  {
    title: 'Team processes it',
    desc: 'Operations + verification workflows handle your request with clear ownership.',
    icon: ListChecks,
    bullets: ['Status timeline', 'Admin comments', 'ETA updates'],
  },
  {
    title: 'Pay & get updates',
    desc: 'Pay securely and receive notifications as your request progresses.',
    icon: Wallet,
    bullets: ['Invoice-ready', 'Payment status', 'Receipts & records'],
  },
  {
    title: 'Track and complete',
    desc: 'A single progress view, from submission to completion, with history.',
    icon: Radar,
    bullets: ['Progress visuals', 'History log', 'Completion proof'],
  },
  {
    title: 'Get support anytime',
    desc: 'Chat with support, share attachments, and resolve blockers quickly.',
    icon: Headphones,
    bullets: ['Priority routing', 'Unread indicators', 'Attachment previews'],
  },
];

export default function BusinessFlowSection() {
  const [active, setActive] = useState(0);
  const activeStep = useMemo(() => steps[active], [active]);

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Built for predictable outcomes
          </motion.div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            A simple flow that feels operational.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Every service runs on a workflow engine: requirements → documents → payments → processing → completion. You
            always know what&apos;s next.
          </p>

          <div className="mt-7 grid gap-2">
            {steps.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(idx)}
                className={clsx(
                  'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition',
                  idx === active
                    ? 'border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5'
                    : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5',
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      'grid h-10 w-10 place-items-center rounded-2xl',
                      idx === active
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',
                    )}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {idx + 1}. {s.title}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s.desc}</div>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{idx === active ? 'Active' : 'View'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-[#0B1020] dark:shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.10),rgba(34,211,238,0.08),rgba(14,165,233,0.06))] dark:bg-[linear-gradient(120deg,rgba(99,102,241,0.16),rgba(34,211,238,0.10),rgba(14,165,233,0.08))]" />
            <div className="relative p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                        <activeStep.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">Step {active + 1}</div>
                        <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                          {activeStep.title}
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      Workflow
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeStep.desc}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {activeStep.bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{b}</div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Built-in best practice</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">Operational cues</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">What you can expect</div>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <Cue label="Clear next actions" value="Always visible" />
                      <Cue label="Timeline updates" value="ETA-based" />
                      <Cue label="Notifications" value="In-app + email" />
                      <Cue label="Support" value="Chat-first" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm dark:bg-black/20">
      <div className="text-xs text-slate-600 dark:text-slate-300">{label}</div>
      <div className="text-xs font-semibold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}

