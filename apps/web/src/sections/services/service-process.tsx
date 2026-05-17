'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, ListChecks } from 'lucide-react';

import type { Service } from '../../modules/services/data/services';
import ServiceProcessStep from '../../components/services/service-process-step';

export default function ServiceProcess({ service }: { service: Service }) {
  const [active, setActive] = useState(0);
  const steps = service.process;
  const current = useMemo(() => steps[active], [steps, active]);

  return (
    <section id="process" className="border-y border-slate-200/70 bg-slate-50/60 dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <ListChecks className="h-3.5 w-3.5" />
              Step-by-step process
            </motion.div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              A timeline you can trust.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Each request runs on a workflow with checkpoints — so you always know what’s pending and what happens next.
            </p>

            <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1020]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">Current step</div>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <Clock3 className="h-3.5 w-3.5" />
                  {current.eta}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-base font-semibold text-slate-900 dark:text-white">{current.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{current.description}</div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Verification checkpoint included
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {steps.map((s, idx) => (
                <button key={s.title} type="button" onClick={() => setActive(idx)} className="text-left">
                  <ServiceProcessStep
                    index={idx}
                    title={s.title}
                    description={s.description}
                    eta={s.eta}
                    active={idx === active}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

