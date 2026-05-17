'use client';

import { ShieldCheck, AlertTriangle, FileText } from 'lucide-react';
import type { DocumentItem } from '../../modules/dashboard/types/dashboard.types';

interface DocumentCardProps {
  document: DocumentItem;
}

const statusStyles = {
  verified: 'bg-emerald-500/10 text-emerald-300',
  pending: 'bg-amber-500/10 text-amber-300',
  attention: 'bg-rose-500/10 text-rose-300',
};

const statusIcons = {
  verified: ShieldCheck,
  pending: FileText,
  attention: AlertTriangle,
};

export default function DocumentCard({ document }: DocumentCardProps) {
  const Icon = statusIcons[document.status];
  return (
    <article className="group rounded-[28px] border border-white/10 bg-slate-950/75 p-5 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:bg-slate-900/90">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-3xl bg-slate-900/80 p-3 text-slate-200 ring-1 ring-white/5">
          <Icon className="h-5 w-5" />
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${statusStyles[document.status]}`}>
          {document.status}
        </span>
      </div>
      <div className="mt-5 space-y-3">
        <h3 className="text-lg font-semibold text-white">{document.name}</h3>
        <p className="text-sm text-slate-400">{document.previewLabel}</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Category</p>
          <p className="mt-2 font-medium text-white">{document.category}</p>
        </div>
        <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Uploaded</p>
          <p className="mt-2 font-medium text-white">{document.uploadedAt}</p>
        </div>
      </div>
    </article>
  );
}
