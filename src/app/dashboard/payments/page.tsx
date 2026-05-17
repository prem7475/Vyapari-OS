'use client';

import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/dashboard-layout';
import PaymentCard from '../../../components/payments/payment-card';
import InvoicePreview from '../../../components/payments/invoice-preview';
import { payments } from '../../../modules/dashboard/data/mock-dashboard';
import type { PaymentStatus } from '../../../modules/dashboard/types/dashboard.types';

const statuses: Array<PaymentStatus | 'all'> = ['all', 'paid', 'pending', 'failed', 'refunded'];

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState(payments[0]);

  const filteredPayments = useMemo(() => {
    if (statusFilter === 'all') return payments;
    return payments.filter((payment) => payment.status === statusFilter);
  }, [statusFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Payments</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Transaction ledger</h1>
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as PaymentStatus | 'all')}
              className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status === 'all' ? 'All statuses' : status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-5">
            {filteredPayments.length ? (
              filteredPayments.map((payment) => (
                <button key={payment.id} type="button" onClick={() => setSelectedInvoice(payment)} className="block w-full text-left">
                  <PaymentCard payment={payment} />
                </button>
              ))
            ) : (
              <div className="rounded-[32px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">
                <p className="text-lg font-semibold text-white">No payments found</p>
                <p className="mt-2">Choose another status to view more transactions.</p>
              </div>
            )}
          </section>
          <aside className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <InvoicePreview payment={selectedInvoice} />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
