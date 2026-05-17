'use client';

import { useState } from 'react';
import { Controller, type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

import { contactSchema, contactTopics } from '../../modules/auth/validations/auth.schema';
import type { ContactInput, ContactTopic } from '../../modules/auth/types/auth.types';
import PhoneInput from '../ui/phone-input';

const LS_CONTACTS = 'vy_web_contact_requests_v1';

function safeRead<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export default function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<ContactInput>({
    defaultValues: { name: '', email: '', phone: '', topic: 'Sales', message: '' },
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(async (values) => {
    setServerError(null);
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const set = <K extends keyof ContactInput>(k: K) => {
        const msg = flat[k as string]?.[0];
        if (msg) form.setError(k, { type: 'validate', message: msg });
      };
      set('name');
      set('email');
      set('phone');
      set('topic');
      set('message');
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 650));
      const list = safeRead<Array<ContactInput & { createdAt: number }>>(LS_CONTACTS) ?? [];
      list.unshift({ ...parsed.data, createdAt: Date.now() });
      safeWrite(LS_CONTACTS, list.slice(0, 300));
      setSent(true);
    } catch {
      setServerError('Unable to submit your message right now. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/25 dark:bg-emerald-500/10"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">Message sent</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Thanks - we will get back to you shortly. If you prefer a quick walkthrough, book a demo call.
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="/book-demo"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Book a demo
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Browse services
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onSubmit={submit}
      className="space-y-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Name"
          placeholder="Your name"
          icon={<MessageCircle className="h-4 w-4" />}
          registration={form.register('name')}
          error={form.formState.errors.name?.message}
          disabled={loading}
        />
        <TextField
          label="Email"
          placeholder="you@company.com"
          icon={<Mail className="h-4 w-4" />}
          registration={form.register('email')}
          error={form.formState.errors.email?.message}
          disabled={loading}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <PhoneInput
              label="Phone (optional)"
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                void form.trigger('phone');
              }}
              error={fieldState.error?.message ?? null}
              hint="India only"
              disabled={loading}
              name={field.name}
            />
          )}
        />

        <SelectField<ContactTopic>
          label="Topic"
          registration={form.register('topic')}
          options={contactTopics.map((v) => ({ value: v, label: v }))}
          error={form.formState.errors.topic?.message}
          disabled={loading}
        />
      </div>

      <TextAreaField
        label="Message"
        placeholder="Tell us what you need help with. Add timelines, service names, or links if relevant."
        registration={form.register('message')}
        error={form.formState.errors.message?.message}
        disabled={loading}
      />

      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-200">
          {serverError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
        Send message
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
          <div>Security tip: We never ask for OTPs over calls or WhatsApp.</div>
        </div>
      </div>
    </motion.form>
  );
}

function TextField({
  label,
  placeholder,
  icon,
  error,
  disabled,
  registration,
}: {
  label: string;
  placeholder?: string;
  icon: React.ReactNode;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
      <div
        className={[
          'relative rounded-2xl border bg-white shadow-sm transition focus-within:ring-4 dark:bg-[#0B1020]',
          error
            ? 'border-rose-300 focus-within:ring-rose-100 dark:border-rose-500/40 dark:focus-within:ring-rose-500/10'
            : 'border-slate-200 focus-within:ring-slate-100 dark:border-white/10 dark:focus-within:ring-white/5',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          {icon}
        </div>
        <input
          disabled={disabled}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl bg-transparent pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-white"
          {...registration}
        />
      </div>
      {error ? <div className="text-xs text-rose-700 dark:text-rose-200">{error}</div> : null}
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  error,
  disabled,
  registration,
}: {
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100 disabled:opacity-60 dark:border-white/10 dark:bg-[#0B1020] dark:text-white dark:focus:border-white/20 dark:focus:ring-white/5"
        {...registration}
      />
      {error ? <div className="text-xs text-rose-700 dark:text-rose-200">{error}</div> : null}
    </div>
  );
}

function SelectField<T extends string>({
  label,
  options,
  error,
  disabled,
  registration,
}: {
  label: string;
  options: Array<{ value: T; label: string }>;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
      <div className="relative">
        <select
          disabled={disabled}
          className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100 disabled:opacity-60 dark:border-white/10 dark:bg-[#0B1020] dark:text-white dark:focus:border-white/20 dark:focus:ring-white/5"
          {...registration}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          ▾
        </div>
      </div>
      {error ? <div className="text-xs text-rose-700 dark:text-rose-200">{error}</div> : null}
    </div>
  );
}

