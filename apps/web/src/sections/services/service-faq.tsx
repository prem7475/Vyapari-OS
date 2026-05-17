'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

import type { Service } from '../../modules/services/data/services';

export default function ServiceFaq({ service }: { service: Service }) {
  const [open, setOpen] = useState<number>(0);
  const faqs = useMemo(() => service.faqs, [service.faqs]);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            FAQs
          </motion.div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Questions founders ask.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Clear answers — designed for speed and trust. If you still need help, book a demo and we’ll walk you through.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
            {faqs.map((f, idx) => (
              <div key={f.q} className="border-b border-slate-200/70 last:border-b-0 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === idx ? -1 : idx))}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{f.q}</div>
                  <ChevronDown
                    className={clsx('h-5 w-5 text-slate-500 transition-transform dark:text-slate-400', open === idx ? 'rotate-180' : 'rotate-0')}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

