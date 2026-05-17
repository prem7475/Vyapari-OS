'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Menu, X } from 'lucide-react';
import clsx from 'clsx';

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = useMemo(() => navItems, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={clsx(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          scrolled ? 'py-3' : 'py-4',
        )}
      >
        <div
          className={clsx(
            'relative flex items-center justify-between rounded-2xl border transition-all',
            scrolled
              ? 'border-slate-200/70 bg-white/75 shadow-[0_10px_30px_rgba(2,6,23,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#0B1020]/70 dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]'
              : 'border-transparent bg-transparent',
          )}
        >
          <div className="flex items-center gap-3 px-3 py-2">
            <Link href="/" className="group flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                <Building2 className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Vyapari OS</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Business OS for India</div>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 px-2 lg:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 px-2 py-2 lg:flex">
            <Link
              href="/signup"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Book Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="px-2 py-2 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(2,6,23,0.14)] dark:border-white/10 dark:bg-[#0B1020] dark:shadow-[0_26px_60px_rgba(0,0,0,0.55)]"
              >
                <div className="flex flex-col p-2">
                  {items.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * idx, duration: 0.16 }}
                      className="rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <div className="mt-2 grid grid-cols-2 gap-2 p-1">
                    <Link
                      href="/signup"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    >
                      Book Demo
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

