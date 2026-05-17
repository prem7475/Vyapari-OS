'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import type { SupportMessage } from '../../modules/dashboard/types/dashboard.types';
import ChatMessage from './chat-message';

interface ChatWindowProps {
  messages: SupportMessage[];
  onSend: (message: string) => void;
}

export default function ChatWindow({ messages, onSend }: ChatWindowProps) {
  const [draft, setDraft] = useState('');

  return (
    <section className="flex h-full flex-col rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/25">
      <div className="mb-5 flex items-center justify-between gap-3 rounded-3xl bg-slate-900/80 px-5 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Live support</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Helpdesk conversation</h2>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Online</span>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          onSend(draft.trim());
          setDraft('');
        }}
        className="mt-5 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 p-3"
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message to support"
          className="min-w-0 flex-1 rounded-3xl bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
        <button type="submit" className="inline-flex items-center gap-2 rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
          <Send className="h-4 w-4" /> Send
        </button>
      </form>
    </section>
  );
}
