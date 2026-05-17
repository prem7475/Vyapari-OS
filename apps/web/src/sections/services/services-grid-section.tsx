'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';

import { serviceCategories, services, type ServiceCategory } from '../../modules/services/data/services';
import ServiceCard from '../../components/services/service-card';

type Filter = ServiceCategory | 'All';

export default function ServicesGridSection() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services
      .filter((s) => (filter === 'All' ? true : s.categories.includes(filter)))
      .filter((s) => {
        if (!q) return true;
        const hay = `${s.title} ${s.shortDescription} ${s.longDescription} ${s.categories.join(' ')} ${s.badges.join(' ')}`.toLowerCase();
        return hay.includes(q);
      });
  }, [query, filter]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <SlidersHorizontal className="h-4 w-4" />
            Find the right service
          </div>

          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GST, FSSAI, Trademark, Compliance…"
              className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-slate-300 focus:ring-4 focus:ring-slate-100 dark:border-white/10 dark:bg-[#0B1020] dark:text-white dark:placeholder:text-slate-400 dark:focus:border-white/20 dark:focus:ring-white/5"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={filter === 'All'} onClick={() => setFilter('All')}>
            All
          </FilterChip>
          {serviceCategories.map((c) => (
            <FilterChip key={c.key} active={filter === c.key} onClick={() => setFilter(c.key)}>
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((service, idx) => (
          <motion.div
            key={service.slug}
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <ServiceCard service={service} index={idx} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold text-slate-900 dark:text-white">No services match your search.</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword or clear filters.</div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('All');
              }}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-full border px-4 py-2 text-sm transition',
        active
          ? 'border-slate-200 bg-slate-900 text-white shadow-sm dark:border-white/10 dark:bg-white dark:text-slate-900'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10',
      )}
    >
      {children}
    </button>
  );
}

