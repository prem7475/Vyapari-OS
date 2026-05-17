'use client';

import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import type { PaymentItem } from '../../modules/dashboard/types/dashboard.types';

const paymentStatusStyles = {
  paid: 'bg-emerald-500/10 text-emerald-300',
  pending: 'bg-amber-500/10 text-amber-300',
  failed: 'bg-rose-500/10 text-rose-300',
  refunded: 'bg-violet-500/10 text-violet-300',
};

export default function PaymentCard({ payment }: { payment: PaymentItem }) {
  const iconMap = {
    paid: ShieldCheck,
    pending: Clock,
    failed: RefreshCw,
    refunded: CreditCard,
  };
  const Icon = iconMap[payment.status];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-[28px] border border-white/10 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/20 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{payment.invoice}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{payment.amount}</h3>
          <p className="mt-2 text-sm text-slate-400">{payment.description}</p>
        </div>
        <div className={`inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${paymentStatusStyles[payment.status]}`}>
          {payment.status}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
        <div className="inline-flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-300" />
          <span>{payment.method}</span>
        </div>
        <span>{payment.date}</span>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 px-4 py-4 text-sm text-slate-300">
        <span>Escrow: {payment.escrow}</span>
        {payment.refundEligible ? <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">Refund eligible</span> : null}
      </div>
    </motion.article>
  );
}
