'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';

const logos = [
  { name: 'KiranaPro', sub: 'Retail' },
  { name: 'DineCraft', sub: 'Food' },
  { name: 'BuildNest', sub: 'Services' },
  { name: 'QuickKart', sub: 'Commerce' },
  { name: 'Medico', sub: 'Pharma' },
  { name: 'StudioNine', sub: 'Creators' },
];

export default function TrustedBySection() {
  return (
    <section className="border-y border-slate-200/70 bg-slate-50/60 dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Trusted by modern Indian businesses</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Built for founders who want speed, clarity, and control.
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200">
              4.9/5 <span className="text-slate-500 dark:text-slate-400">ops satisfaction</span>
            </div>
            <ShieldCheck className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l, idx) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.03, ease: 'easeOut' }}
              className="group rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">{l.name}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{l.sub}</div>
              <div className="mt-3 h-1 w-10 rounded-full bg-slate-100 dark:bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

