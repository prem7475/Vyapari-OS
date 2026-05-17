'use client';

import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/dashboard-layout';
import { notifications } from '../../../modules/dashboard/data/mock-dashboard';

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);

  const unreadCount = useMemo(() => items.filter((item) => item.unread).length, [items]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Notifications</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Inbox updates</h1>
          </div>
          <button
            type="button"
            onClick={() => setItems(items.map((item) => ({ ...item, unread: false })))}
            className="rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900"
          >
            Mark all read
          </button>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Unread alerts</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{unreadCount} new items</h2>
            </div>
            <div className="rounded-full bg-slate-900/80 px-4 py-3 text-sm text-slate-300">Latest first</div>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className={`rounded-3xl border border-white/10 p-5 transition ${item.unread ? 'bg-slate-900/90' : 'bg-slate-950/70'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                  </div>
                  <span className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.24em] ${item.unread ? 'bg-sky-500/10 text-sky-300' : 'bg-slate-800/80 text-slate-500'}`}>
                    {item.category}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
                  <span>{item.receivedAt}</span>
                  <span>{item.unread ? 'Unread' : 'Read'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
