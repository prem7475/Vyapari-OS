'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { SupportMessage } from '../../modules/dashboard/types/dashboard.types';

interface ChatMessageProps {
  message: SupportMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.author === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[82%] space-y-2 rounded-3xl border border-white/10 px-5 py-4 text-sm shadow-sm ${isUser ? 'bg-sky-500/10 text-slate-100' : 'bg-slate-900/80 text-slate-300'}`}>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-slate-300" />
          <span className="font-semibold text-slate-200">{isUser ? 'You' : 'Agent'}</span>
        </div>
        <p className="leading-6">{message.message}</p>
        <p className="text-right text-xs text-slate-500">{message.timestamp}</p>
      </div>
    </motion.div>
  );
}
