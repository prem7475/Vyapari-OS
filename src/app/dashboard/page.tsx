'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import DashboardStatCard from '../../components/dashboard/dashboard-stat-card';
import RequestCard from '../../components/requests/request-card';
import type { RequestItem, PaymentItem, NotificationItem } from '../../modules/dashboard/types/dashboard.types';
import { dashboardStats, requests, payments, notifications, analyticsOverview } from '../../modules/dashboard/data/mock-dashboard';

export default function DashboardPage() {
  const recentRequests = requests.slice(0, 3);
  const recentPayments = payments.slice(0, 3);
  const latestNotifications = notifications.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid gap-5 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <DashboardStatCard key={stat.label} stat={stat} />
          ))}
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Business insight</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Operations pulse</h2>
              </div>
              <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200">Last 30 days</div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Success rate</p>
                <p className="mt-3 text-4xl font-semibold text-white">{analyticsOverview.successRate}%</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[94%] rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Average resolution</p>
                <p className="mt-3 text-4xl font-semibold text-white">{analyticsOverview.avgResolution}</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-sky-400" />
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/75 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Requests this month</p>
                <p className="mt-3 text-3xl font-semibold text-white">{analyticsOverview.monthVolume}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/75 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Risk exposure</p>
                <p className="mt-3 text-3xl font-semibold text-white">{analyticsOverview.riskExposure}</p>
              </div>
            </div>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick actions</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Accelerate workflow</h2>
              </div>
              <span className="rounded-full bg-slate-900/70 px-3 py-2 text-xs text-slate-300">Premium hub</span>
            </div>
            <div className="mt-8 grid gap-4">
              {['Upload document', 'Review pending requests', 'Generate invoice', 'Open support ticket'].map((action) => (
                <button key={action} className="w-full rounded-3xl border border-white/10 bg-slate-900/75 px-5 py-4 text-left text-sm font-medium text-slate-100 transition hover:bg-slate-900">
                  {action}
                </button>
              ))}
            </div>
          </motion.section>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Active requests</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Request pipeline</h2>
              </div>
              <div className="text-sm text-slate-400">Top priorities shown</div>
            </div>
            <div className="mt-6 space-y-4">
              {recentRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </section>
          <div className="space-y-5">
            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recent payments</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Cashflow snapshot</h2>
                </div>
                <span className="rounded-full bg-slate-900/70 px-3 py-2 text-xs text-slate-300">Updated now</span>
              </div>
              <div className="mt-6 space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{payment.invoice}</p>
                        <p className="text-slate-400">{payment.description}</p>
                      </div>
                      <span className="text-sm text-slate-300">{payment.amount}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                      <span>{payment.status}</span>
                      <span>{payment.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Notifications</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Latest updates</h2>
                </div>
                <span className="rounded-full bg-slate-900/70 px-3 py-2 text-xs text-slate-300">{latestNotifications.filter((item) => item.unread).length} unread</span>
              </div>
              <div className="mt-6 space-y-4">
                {latestNotifications.map((notification) => (
                  <div key={notification.id} className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{notification.title}</p>
                      <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{notification.receivedAt}</span>
                    </div>
                    <p className="mt-2 text-slate-400">{notification.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
