'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/dashboard-layout';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('English');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [businessName, setBusinessName] = useState('Vyapari Essentials Pvt. Ltd.');
  const [contactPerson, setContactPerson] = useState('Nisha Patel');
  const [businessEmail, setBusinessEmail] = useState('nisha@vyapari.co');
  const [businessPhone, setBusinessPhone] = useState('+91 98765 43210');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Business profile & security</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-400">Configure your profile, notification preferences, and account security in one polished control panel.</p>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <section className="space-y-5 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Profile settings</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Business details</h2>
            </div>
            <div className="grid gap-4">
              <label className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                <span className="block text-slate-400">Company name</span>
                <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} className="mt-3 w-full bg-transparent text-white outline-none" />
              </label>
              <label className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                <span className="block text-slate-400">Contact person</span>
                <input value={contactPerson} onChange={(event) => setContactPerson(event.target.value)} className="mt-3 w-full bg-transparent text-white outline-none" />
              </label>
              <label className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                <span className="block text-slate-400">Business email</span>
                <input value={businessEmail} onChange={(event) => setBusinessEmail(event.target.value)} className="mt-3 w-full bg-transparent text-white outline-none" />
              </label>
              <label className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                <span className="block text-slate-400">Phone number</span>
                <input value={businessPhone} onChange={(event) => setBusinessPhone(event.target.value)} className="mt-3 w-full bg-transparent text-white outline-none" />
              </label>
            </div>
          </section>
          <section className="space-y-5 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Preferences</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Notifications & theme</h2>
            </div>
            <div className="space-y-4 rounded-3xl bg-slate-900/80 p-5">
              <div className="space-y-2 text-sm text-slate-200">
                <label className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/70 px-4 py-4">
                  <span>Theme mode</span>
                  <select value={theme} onChange={(event) => setTheme(event.target.value as 'system' | 'dark' | 'light')} className="rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-2 text-slate-100 outline-none">
                    <option value="system">System</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </label>
                <label className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/70 px-4 py-4">
                  <span>Email notifications</span>
                  <input type="checkbox" checked={emailNotifications} onChange={(event) => setEmailNotifications(event.target.checked)} className="h-5 w-5 rounded border border-white/10 bg-slate-800 text-sky-500" />
                </label>
                <label className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/70 px-4 py-4">
                  <span>SMS alerts</span>
                  <input type="checkbox" checked={smsAlerts} onChange={(event) => setSmsAlerts(event.target.checked)} className="h-5 w-5 rounded border border-white/10 bg-slate-800 text-sky-500" />
                </label>
                <label className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/70 px-4 py-4">
                  <span>Two-factor authentication</span>
                  <input type="checkbox" checked={twoFactor} onChange={(event) => setTwoFactor(event.target.checked)} className="h-5 w-5 rounded border border-white/10 bg-slate-800 text-sky-500" />
                </label>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-sm text-slate-400">
              <p className="font-semibold text-white">Security note</p>
              <p className="mt-2">We recommend enabling 2FA and keeping notification alerts active for every new request and payment update.</p>
            </div>
          </section>
        </div>
        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Language</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Regional preferences</h2>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-900/80 p-5 text-slate-300">
            <label className="flex items-center justify-between gap-4 text-sm">
              <span>Preferred language</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none">
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Gujarati</option>
              </select>
            </label>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
