'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DocumentUploadModal({ open, onClose }: DocumentUploadModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Upload new document</h2>
                <p className="mt-2 text-sm text-slate-400">Attach supporting documents for faster verification.</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-white/10 bg-slate-950/90 p-3 text-slate-300 transition hover:bg-slate-900">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300 transition hover:border-slate-700">
                <span className="block text-sm font-medium text-white">Select category</span>
                <select className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-500">
                  <option>PAN</option>
                  <option>Aadhaar</option>
                  <option>GST</option>
                  <option>FSSAI</option>
                  <option>Trademark</option>
                </select>
              </label>
              <label className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300 transition hover:border-slate-700">
                <span className="block text-sm font-medium text-white">Upload file</span>
                <input type="file" className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none" />
              </label>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-400">
              <p className="font-medium text-white">Best practice</p>
              <p className="mt-2">Upload clear scans for faster approval. Verified document uploads are included in request progress immediately.</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800">Cancel</button>
              <button className="rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110">Upload document</button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
