'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowLeft, CalendarDays, ClipboardList, MapPin, Tag } from 'lucide-react';
import DashboardLayout from '../../../../components/dashboard/dashboard-layout';
import RequestTimeline from '../../../../components/requests/request-timeline';
import RequestStatusBadge from '../../../../components/requests/request-status-badge';
import { findRequestById } from '../../../../modules/dashboard/data/mock-dashboard';
import type { RequestItem } from '../../../../modules/dashboard/types/dashboard.types';

interface RequestDetailPageProps {
  params: { id: string };
}

export default function RequestDetailPage({ params }: RequestDetailPageProps) {
  const request = useMemo(() => findRequestById(params.id), [params.id]);

  if (!request) {
    return (
      <DashboardLayout>
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
          <p className="text-xl font-semibold text-white">Request not found</p>
          <p className="mt-3">Double-check the request ID and return to the requests list.</p>
          <Link href="/dashboard/requests" className="mt-6 inline-flex rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Back to requests
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link href="/dashboard/requests" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900">
                <ArrowLeft className="h-4 w-4" /> Back to requests
              </Link>
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-slate-400">Request detail</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold text-white">{request.title}</h1>
                <RequestStatusBadge status={request.status} />
              </div>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">Track each milestone, review uploaded documents, and see how the team is progressing toward completion.</p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Client</p>
                <p className="mt-2 font-semibold text-white">{request.client}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Service</p>
                <p className="mt-2 font-semibold text-white">{request.service}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-5">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Timeline</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Process tracking</h2>
                </div>
                <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">{request.progress}% complete</div>
              </div>
              <div className="mt-8">
                <RequestTimeline timeline={request.timeline} />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Uploaded docs</p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  {request.documents.map((document) => (
                    <div key={document} className="rounded-3xl bg-slate-900/80 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span>{document}</span>
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Uploaded</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admin notes</p>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  {request.adminNotes.map((note) => (
                    <div key={note} className="rounded-3xl bg-slate-900/80 p-4">
                      <p>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <aside className="space-y-5">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary</p>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-slate-400" />
                  <span>Submitted on {request.submittedAt}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>ETA {request.estimatedCompletion}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-4 w-4 text-slate-400" />
                  <span>{request.documents.length} documents attached</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-slate-400" />
                  <span>Priority {request.priority}</span>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Payment history</p>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="font-semibold text-white">₹{request.amount.replace(/[₹,]/g, '')}</p>
                  <p className="mt-2 text-slate-400">Primary payment is processing with compliance hold.</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Next milestone</p>
                  <p className="mt-2">Finalize documents and submit response to regulator.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
