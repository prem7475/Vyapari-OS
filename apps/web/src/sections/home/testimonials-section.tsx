'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import clsx from 'clsx';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Aditi Kulkarni',
    role: 'Founder',
    company: 'DineCraft Foods',
    quote:
      'We moved from WhatsApp chaos to a clean workflow. Every document, every step, and every update is tracked. Our FSSAI + GST got done without follow-up fatigue.',
    metric: 'Cut follow-ups by ~70%',
  },
  {
    name: 'Karthik Iyer',
    role: 'Owner',
    company: 'QuickKart Retail',
    quote:
      'The timeline view is what I always wanted. I can see what’s pending and who’s handling it. We started with MSME and ended up using compliance tracking monthly.',
    metric: 'On-time filings improved',
  },
  {
    name: 'Neha Jain',
    role: 'Co-founder',
    company: 'StudioNine',
    quote:
      'Trademark filing felt intimidating. Vyapari OS made it structured — requirements, uploads, reviews, and status updates were predictable. The vault is a lifesaver.',
    metric: 'Zero document rework',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = useMemo(() => testimonials[active], [active]);

  return (
    <section id="testimonials" className="border-y border-slate-200/70 bg-slate-50/60 dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Social proof</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Trusted by founders who value clarity.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Businesses choose Vyapari OS because it feels calm, operational, and predictable — built for India-first
              workflows.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200">
              4.9 <span className="text-slate-500 dark:text-slate-400">avg rating</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B1020]">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.08),rgba(34,211,238,0.06),rgba(14,165,233,0.05))] dark:bg-[linear-gradient(120deg,rgba(99,102,241,0.14),rgba(34,211,238,0.08),rgba(14,165,233,0.06))]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                      <Quote className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{current.company}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{current.metric}</div>
                    </div>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    Verified
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="mt-6"
                  >
                    <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">{current.quote}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{current.name}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                          {current.role} • {current.company}
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-3">
              {testimonials.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={clsx(
                    'rounded-2xl border px-4 py-4 text-left transition',
                    idx === active
                      ? 'border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5'
                      : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</div>
                      <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {t.role} • {t.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </div>
                  </div>
                  <div className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{t.quote}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

