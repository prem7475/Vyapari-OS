'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/dashboard-layout';
import ChatWindow from '../../../components/support/chat-window';
import { supportMessages, supportTickets } from '../../../modules/dashboard/data/mock-dashboard';
import type { SupportMessage, SupportTicket } from '../../../modules/dashboard/types/dashboard.types';

export default function SupportPage() {
  const [messages, setMessages] = useState<SupportMessage[]>(supportMessages);
  const [selectedTicketId, setSelectedTicketId] = useState(supportTickets[0].id);

  const activeTicket = supportTickets.find((ticket) => ticket.id === selectedTicketId) ?? supportTickets[0];

  const handleSend = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages((previous) => [...previous, { id: `MSG-${previous.length + 10}`, author: 'user', message, timestamp }]);
  };

  return (
    <DashboardLayout>
      <div className="grid gap-5 xl:grid-cols-[0.35fr_0.65fr]">
        <aside className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Support center</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Help tickets</h1>
            <p className="mt-2 text-sm text-slate-400">Switch between open tickets and monitor unread responses.</p>
          </div>
          <div className="mt-6 space-y-3">
            {supportTickets.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`w-full rounded-3xl border px-4 py-4 text-left transition ${ticket.id === activeTicket.id ? 'border-sky-500/30 bg-slate-900/90 text-white' : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{ticket.subject}</p>
                    <p className="mt-1 text-sm text-slate-400">Updated {ticket.updatedAt}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em] ${ticket.status === 'open' ? 'bg-emerald-500/10 text-emerald-200' : ticket.status === 'pending' ? 'bg-amber-500/10 text-amber-200' : 'bg-slate-800/80 text-slate-400'}`}>
                    {ticket.status}
                  </span>
                </div>
                {ticket.unreadCount ? <p className="mt-3 text-xs text-slate-400">{ticket.unreadCount} unread message(s)</p> : null}
              </button>
            ))}
          </div>
        </aside>
        <section className="space-y-5">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Conversation</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{activeTicket.subject}</h2>
              </div>
              <div className="rounded-3xl bg-slate-900/70 px-4 py-3 text-sm text-slate-300">Ticket ID {activeTicket.id}</div>
            </div>
          </div>
          <ChatWindow messages={messages} onSend={handleSend} />
        </section>
      </div>
    </DashboardLayout>
  );
}
