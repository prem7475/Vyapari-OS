'use client';

import { motion } from 'framer-motion';
import {
  BadgeIndianRupee,
  CheckCircle2,
  FileText,
  Leaf,
  ShieldCheck,
  Store,
  Tags,
  Truck,
} from 'lucide-react';
import clsx from 'clsx';

const featureCards = [
  {
    icon: FileText,
    title: 'GST Registration',
    desc: 'Apply, track documents, and get completion updates in one workflow.',
    tag: 'Most popular',
  },
  {
    icon: Leaf,
    title: 'FSSAI',
    desc: 'Food business licensing with clear document requirements and ETAs.',
    tag: 'Fast turnaround',
  },
  {
    icon: Tags,
    title: 'Trademark',
    desc: 'Brand protection with structured filing steps and evidence vault.',
    tag: 'Founder-ready',
  },
  {
    icon: BadgeIndianRupee,
    title: 'MSME / Udyam',
    desc: 'Get your MSME certificate with guided inputs and verification.',
    tag: 'Paperwork-light',
  },
  {
    icon: Truck,
    title: 'Swiggy / Zomato Onboarding',
    desc: 'Onboarding support, checklists, and document verification.',
    tag: 'Operations support',
  },
  {
    icon: Store,
    title: 'Compliance Tracking',
    desc: 'Filing reminders, status history, and clear next actions.',
    tag: 'Never miss a due date',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="border-y border-slate-200/70 bg-slate-50/60 dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Premium workflows for core business services
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
              className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
            >
              Everything you need to launch, comply, and scale.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
              className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Services are packaged as workflows: requirements, document vault, payments, and progress tracking — built to
              feel calm and predictable.
            </motion.p>
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <Stat label="Average completion time" value="3–7 days" />
              <Stat label="Visibility" value="Real-time status" />
              <Stat label="Ops support" value="Dedicated team" />
              <Stat label="Document vault" value="Secure + searchable" />
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featureCards.map((c) => (
            <motion.div
              key={c.title}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-[#0B1020] dark:hover:bg-white/10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -left-20 -top-16 h-44 w-44 rounded-full bg-indigo-500/10 blur-2xl" />
                <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-2xl" />
              </div>
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {c.tag}
                  </span>
                </div>
                <div className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{c.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.desc}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                  Explore workflow
                  <span className="h-7 w-7 rounded-full border border-slate-200 bg-white grid place-items-center transition group-hover:translate-x-0.5 dark:border-white/10 dark:bg-white/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div id="services" className="sr-only" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}

