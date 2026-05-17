import Link from 'next/link';
import { Building2, Mail, MapPin, Phone } from 'lucide-react';

const links = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Services', href: '/services' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Security', href: '/security' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white dark:border-white/10 dark:bg-[#070A12]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
                <Building2 className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-base font-semibold tracking-tight">Vyapari OS</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Launch, comply, and grow — without paperwork chaos.
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span>Built for India-first SMBs and new-age founders.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <a className="hover:underline" href="mailto:hello@vyapari.os">
                  hello@vyapari.os
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <a className="hover:underline" href="tel:+919999999999">
                  +91 99999 99999
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Product</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link className="hover:text-slate-900 hover:underline dark:hover:text-white" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Company</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>
                  <Link className="hover:text-slate-900 hover:underline dark:hover:text-white" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900 hover:underline dark:hover:text-white" href="/careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900 hover:underline dark:hover:text-white" href="/partners">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Legal</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link className="hover:text-slate-900 hover:underline dark:hover:text-white" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200/70 pt-8 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Vyapari OS. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              Built with security-first workflows
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

