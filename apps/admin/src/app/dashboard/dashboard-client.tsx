'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AdminMe = { id: string; email: string; name: string; role: string };

export default function DashboardClient() {
  const router = useRouter();
  const [me, setMe] = useState<AdminMe | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadMe() {
    setLoading(true);
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (res.ok) {
      const json = (await res.json()) as { ok: true; data: AdminMe };
      setMe(json.data);
      setLoading(false);
      return;
    }

    const refreshed = await fetch('/api/auth/refresh', { method: 'POST' });
    if (refreshed.ok) {
      const res2 = await fetch('/api/auth/me', { cache: 'no-store' });
      if (res2.ok) {
        const json2 = (await res2.json()) as { ok: true; data: AdminMe };
        setMe(json2.data);
        setLoading(false);
        return;
      }
    }

    router.replace('/login');
  }

  useEffect(() => {
    void loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
  }

  return (
    <div className="min-h-screen px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-xl2 shadow-card px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-border grid place-items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-brand" />
            </div>
            <div>
              <div className="text-xs text-muted">Vyapari OS Admin</div>
              <div className="text-sm font-medium tracking-tight">Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {me && (
              <div className="text-right">
                <div className="text-xs text-muted">{me.role}</div>
                <div className="text-sm">{me.name}</div>
              </div>
            )}
            <button
              onClick={logout}
              className="rounded-xl bg-white/5 border border-border px-3 py-2 text-sm hover:bg-white/10 transition"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Tile title="Requests" value="—" subtitle="Assigned • Pending • Completed" loading={loading} />
          <Tile title="Revenue" value="—" subtitle="Today • This week • MTD" loading={loading} />
          <Tile title="Ops Health" value="—" subtitle="SLA • Backlog • Productivity" loading={loading} />
        </div>

        <div className="mt-6 glass rounded-xl2 shadow-card p-5">
          <div className="text-sm font-medium">Activity</div>
          <div className="text-xs text-muted mt-1">Real-time streams and audit logs will surface here.</div>

          <div className="mt-4 space-y-3">
            <SkeletonLine loading={loading} />
            <SkeletonLine loading={loading} />
            <SkeletonLine loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({
  title,
  value,
  subtitle,
  loading
}: {
  title: string;
  value: string;
  subtitle: string;
  loading: boolean;
}) {
  return (
    <div className="glass rounded-xl2 shadow-card p-5">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-2">
        {loading ? (
          <motion.div
            className="h-6 w-24 rounded bg-white/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        ) : (
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
        )}
      </div>
      <div className="mt-2 text-xs text-subtle">{subtitle}</div>
    </div>
  );
}

function SkeletonLine({ loading }: { loading: boolean }) {
  if (!loading) {
    return <div className="text-xs text-muted">No recent events.</div>;
  }
  return (
    <motion.div
      className="h-4 w-full rounded bg-white/10"
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 1.1, repeat: Infinity }}
    />
  );
}

