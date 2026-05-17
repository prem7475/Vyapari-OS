'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Filter } from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/dashboard-layout';
import RequestCard from '../../../components/requests/request-card';
import { requests } from '../../../modules/dashboard/data/mock-dashboard';
import type { RequestStatus } from '../../../modules/dashboard/types/dashboard.types';

const statusOptions: Array<RequestStatus | 'all'> = ['all', 'submitted', 'under_review', 'documents_pending', 'processing', 'approved', 'completed', 'rejected'];

export default function RequestsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'progress'>('date');

  const filteredRequests = useMemo(() => {
    return [...requests]
      .filter((request) => {
        if (statusFilter !== 'all' && request.status !== statusFilter) return false;
        if (!query) return true;
        return [request.title, request.client, request.service, request.id].some((value) => value.toLowerCase().includes(query.toLowerCase()));
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const rank = { high: 0, medium: 1, low: 2 } as const;
          return rank[a.priority] - rank[b.priority];
        }
        if (sortBy === 'progress') {
          return b.progress - a.progress;
        }
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      });
  }, [query, statusFilter, sortBy]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Request management</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">All service requests</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                <Filter className="h-4 w-4" /> Status filter
              </div>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                <SlidersHorizontal className="h-4 w-4" /> Sort by {sortBy}
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
            <label className="relative block rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner shadow-slate-950/10">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search requests, clients or IDs"
                className="w-full bg-transparent pl-10 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as RequestStatus | 'all')}
                className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status === 'all' ? 'All statuses' : status.replace('_', ' ')}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as 'date' | 'priority' | 'progress')}
                className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none"
              >
                <option value="date">Newest first</option>
                <option value="priority">Priority</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-5">
            {filteredRequests.length ? (
              filteredRequests.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <div className="rounded-[32px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">
                <p className="text-lg font-semibold text-white">No matching requests</p>
                <p className="mt-2">Adjust your search or filters to find the right request.</p>
              </div>
            )}
          </section>
          <aside className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Request summary</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Total requests</p>
                <p className="mt-2 text-3xl">{requests.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Highest priority</p>
                <p className="mt-2">Trademark Registration</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Fastest completion</p>
                <p className="mt-2">PAN correction — 10 days</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
