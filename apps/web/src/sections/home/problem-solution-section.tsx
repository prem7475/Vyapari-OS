'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, FileWarning, Layers3, Timer, Workflow } from 'lucide-react';

const problems = [
  { icon: FileWarning, title: 'Document chaos', desc: 'PAN/Aadhaar/GST files across WhatsApp, email and drives.' },
  { icon: Timer, title: 'Unclear timelines', desc: 'No visibility on what is pending, who is doing what, and when.' },
  { icon: AlertTriangle, title: 'Compliance anxiety', desc: 'Missed filings, late fees, and last-minute panic.' },
];

const solutions = [
  { icon: Workflow, title: 'Guided workflows', desc: 'Step-by-step processes for every business service.' },
  { icon: Layers3, title: 'One operational view', desc: 'Track requests, documents, payments, and updates in one place.' },
  { icon: CheckCircle2, title: 'Verification-first ops', desc: 'Structured checks and clear next actions for faster closures.' },
];

export default function ProblemSolutionSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              Why Vyapari OS
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Less chaos. More control.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Indian businesses waste hours on follow-ups, scattered documents, and unclear responsibilities. Vyapari OS
              brings clarity with workflows, a secure vault, and operational tracking built for speed.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <Panel title="The problem" tone="problem" items={problems} />
            <Panel title="The solution" tone="solution" items={solutions} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  tone,
  items,
}: {
  title: string;
  tone: 'problem' | 'solution';
  items: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
}) {
  const badge =
    tone === 'problem'
      ? 'bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200'
      : 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge}`}>{tone === 'problem' ? 'Pain' : 'Clarity'}</span>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.title} className="flex gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-black/20">
            <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white">
              <it.icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{it.title}</div>
              <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

