'use client';

import { motion } from 'framer-motion';
import { FileInvoice, ArrowRight } from 'lucide-react';
import type { PaymentItem } from '../../modules/dashboard/types/dashboard.types';

interface InvoicePreviewProps {
  payment: PaymentItem;
}

export default function InvoicePreview({ payment }: InvoicePreviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-2 text-sm text-slate-300">
            <FileInvoice className="h-4 w-4" /> Invoice preview
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">{payment.invoice}</h2>
          <p className="mt-2 text-sm text-slate-400">Captured via {payment.method}. Escrow status is {payment.escrow}.</p>
        </div>
        <div className="rounded-3xl bg-slate-950/70 px-4 py-3 text-right text-sm text-slate-300">
          <p className="text-slate-400">Total</p>
          <p className="mt-2 text-xl font-semibold text-white">{payment.amount}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4 rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Payment date</span>
          <span>{payment.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Payment method</span>
          <span>{payment.method}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Invoice status</span>
          <span className="font-semibold text-white uppercase">{payment.status}</span>
        </div>
      </div>
      <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110">
        Download invoice
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.section>
  );
}
