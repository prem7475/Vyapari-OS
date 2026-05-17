'use client';

import { motion } from 'framer-motion';
import { FileText, ShieldCheck } from 'lucide-react';

import type { Service } from '../../modules/services/data/services';
import DocumentBadge from '../../components/services/document-badge';

export default function ServiceDocuments({ service }: { service: Service }) {
  return (
    <section id="documents" className="border-y border-slate-200/70 bg-slate-50/60 dark:border-white/10 dark:bg-white/5">
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
              <FileText className="h-3.5 w-3.5" />
              Required documents
            </motion.div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Upload once, reuse across services.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Your vault keeps documents organized, searchable, and reusable. We also validate clarity and completeness to
              reduce rework.
            </p>

            <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0B1020]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <ShieldCheck className="h-4 w-4" />
                Verification checks included
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                We flag unclear images, missing pages, and mismatches early so your request doesn’t stall.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {service.requiredDocuments.map((d) => (
                <DocumentBadge
                  key={d.label}
                  label={d.label}
                  notes={d.notes}
                  tone={/aadhaar|pan/i.test(d.label) ? 'sensitive' : 'default'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

