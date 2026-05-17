import type { RequestStatus } from '../../modules/dashboard/types/dashboard.types';

const statusMap: Record<RequestStatus, { label: string; classes: string }> = {
  submitted: { label: 'Submitted', classes: 'bg-slate-700/80 text-slate-200' },
  under_review: { label: 'Under review', classes: 'bg-amber-500/10 text-amber-300' },
  documents_pending: { label: 'Docs pending', classes: 'bg-rose-500/10 text-rose-300' },
  processing: { label: 'Processing', classes: 'bg-sky-500/10 text-sky-300' },
  approved: { label: 'Approved', classes: 'bg-emerald-500/10 text-emerald-300' },
  completed: { label: 'Completed', classes: 'bg-emerald-500/15 text-emerald-200' },
  rejected: { label: 'Rejected', classes: 'bg-rose-500/15 text-rose-200' },
};

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

export default function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const metadata = statusMap[status];
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${metadata.classes}`}>{metadata.label}</span>;
}
