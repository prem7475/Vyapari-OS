'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Timer, Workflow } from 'lucide-react';

import type { Service } from '../../modules/services/data/services';

export default function ServiceFeatures({ service }: { service: Service }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <Workflow className="h-3.5 w-3.5" />
              Overview
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Built as a workflow — not a form.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              You get operational clarity: a checklist, verification checkpoints, and timeline updates. This reduces rework
              and speeds up completion.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={Timer}
              title="Predictable timelines"
              desc={`Typical completion: ${service.timelines.business}. You always know what’s next.`}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Verification-first"
              desc="Documents are checked for clarity and completeness before filing."
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Clear next actions"
              desc="No confusion — each step has a status and an explicit next action."
            />
            <FeatureCard
              icon={Workflow}
              title="Operational tracking"
              desc="All updates are stored with a timeline that feels calm and audit-friendly."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Key benefits</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 dark:bg-black/20">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <div className="text-sm text-slate-700 dark:text-slate-200">{h}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

