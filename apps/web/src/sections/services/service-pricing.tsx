'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import type { Service } from '../../modules/services/data/services';
import PricingCard from '../../components/services/pricing-card';

export default function ServicePricing({ service }: { service: Service }) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Choose a plan that matches your urgency
          </motion.div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Pricing plans
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Starter is great for simple setups. Business is best for speed and priority support. Priority Processing is
            for tight timelines and dedicated ops handling.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {service.pricing.map((p) => (
          <PricingCard key={p.id} plan={p} ctaHref={`/signup?service=${encodeURIComponent(service.slug)}&plan=${p.id}`} ctaLabel="Start Process" />
        ))}
      </div>
    </section>
  );
}

