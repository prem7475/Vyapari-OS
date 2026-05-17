'use client';

import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/dashboard-layout';
import DocumentCard from '../../../components/documents/document-card';
import DocumentUploadModal from '../../../components/documents/document-upload-modal';
import { documents } from '../../../modules/dashboard/data/mock-dashboard';
import type { DocumentCategory } from '../../../modules/dashboard/types/dashboard.types';

const categories: Array<DocumentCategory | 'all'> = ['all', 'PAN', 'Aadhaar', 'GST', 'FSSAI', 'Trademark'];

export default function DocumentsPage() {
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredDocs = useMemo(() => {
    if (categoryFilter === 'all') return documents;
    return documents.filter((document) => document.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Document center</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Manage business documents</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as DocumentCategory | 'all')}
              className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category === 'all' ? 'All categories' : category}</option>
              ))}
            </select>
            <button onClick={() => setModalOpen(true)} className="rounded-3xl bg-gradient-to-r from-sky-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110">
              Upload document
            </button>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredDocs.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
          {!filteredDocs.length ? (
            <div className="col-span-full rounded-[32px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">
              <p className="text-lg font-semibold text-white">No documents available</p>
              <p className="mt-2">Upload your first document to keep your business verification flow moving.</p>
            </div>
          ) : null}
        </div>
      </div>
      <DocumentUploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}
