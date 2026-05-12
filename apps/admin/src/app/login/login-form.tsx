'use client';

import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

type ApiOk = { ok: true; data: { admin: { id: string; email: string; name: string; role: string } } };
type ApiErr = { ok: false; error: { message: string } };

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => params.get('next') ?? '/dashboard', [params]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 3 && password.length >= 8 && !loading;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = (await res.json()) as ApiOk | ApiErr;
      if (!res.ok || !json.ok) {
        setError((json as ApiErr).error?.message ?? 'Sign in failed');
        setLoading(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch (_) {
      setError('Network error. Try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs text-muted">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          className="w-full rounded-xl bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-white/20"
          placeholder="admin@vyapari.com"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-muted">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          className="w-full rounded-xl bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-white/20"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-200 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2"
        >
          {error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-brand hover:bg-brand/90 disabled:opacity-50 disabled:hover:bg-brand text-white text-sm font-medium py-2.5 transition shadow-soft"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}

