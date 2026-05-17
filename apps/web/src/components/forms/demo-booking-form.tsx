'use client';

import { useMemo, useState } from 'react';
import { Controller, type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Clock3, Loader2, PhoneCall, ShieldCheck } from 'lucide-react';

import {
  businessCategories,
  demoBookingSchema,
  demoCompanySizes,
  preferredCallTimes,
} from '../../modules/auth/validations/auth.schema';
import type { BusinessCategory, DemoBookingInput, DemoCompanySize, PreferredCallTime } from '../../modules/auth/types/auth.types';
import PhoneInput from '../ui/phone-input';

const LS_DEMOS = 'vy_web_demo_requests_v1';

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

export default function DemoBookingForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<DemoBookingInput>({
    defaultValues: {
      name: '',
      phone: '',
      businessType: 'Retail Shop',
      companySize: '1-5',
      preferredCallTime: 'Morning',
      notes: '',
    },
    mode: 'onSubmit',
  });

  const previewSlot = useMemo(() => {
    const time = form.watch('preferredCallTime');
    if (time === 'Morning') return '10:30 AM - 12:30 PM';
    if (time === 'Afternoon') return '2:00 PM - 5:00 PM';
    return '6:00 PM - 8:30 PM';
  }, [form.watch('preferredCallTime')]);

  const submit = form.handleSubmit(async (values) => {
    setServerError(null);
    const parsed = demoBookingSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const set = <K extends keyof DemoBookingInput>(k: K) => {
        const msg = flat[k as string]?.[0];
        if (msg) form.setError(k, { type: 'validate', message: msg });
      };
      set('name');
      set('phone');
      set('businessType');
      set('companySize');
      set('preferredCallTime');
      set('notes');
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 650));
      const list = safeRead<Array<DemoBookingInput & { createdAt: number }>>(LS_DEMOS) ?? [];
      list.unshift({ ...parsed.data, createdAt: Date.now() });
      safeWrite(LS_DEMOS, list.slice(0, 200));
      setSuccess(true);
      form.reset({ ...form.getValues(), notes: '' });
    } catch {
      setServerError('Unable to submit your request right now. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
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
            registration={form.register('name')}
            error={form.formState.errors.name?.message}
            disabled={loading || success}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <PhoneInput
                label="Phone number"
                value={field.value}
                onChange={field.onChange}
                onBlur={() => {
                  field.onBlur();
                  void form.trigger('phone');
                }}
                error={fieldState.error?.message ?? null}
                hint="WhatsApp OK"
                disabled={loading || success}
                name={field.name}
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField<BusinessCategory>
            label="Business type"
            registration={form.register('businessType')}
            options={businessCategories.map((c) => ({ value: c, label: c }))}
            error={form.formState.errors.businessType?.message}
            disabled={loading || success}
          />

          <SelectField<DemoCompanySize>
            label="Company size"
            registration={form.register('companySize')}
            options={demoCompanySizes.map((v) => ({ value: v, label: v.replace('-', ' - ') }))}
            error={form.formState.errors.companySize?.message}
            disabled={loading || success}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField<PreferredCallTime>
            label="Preferred call time"
            registration={form.register('preferredCallTime')}
            options={preferredCallTimes.map((v) => ({ value: v, label: v }))}
            error={form.formState.errors.preferredCallTime?.message}
            disabled={loading || success}
          />

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <CalendarDays className="h-4 w-4" />
              Suggested slot
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <Clock3 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              {previewSlot}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">We confirm over call/WhatsApp.</div>
          </div>
        </div>

        <TextAreaField
          label="Notes (optional)"
          placeholder="Tell us what you need - registrations, compliance, onboarding, or operations support."
          registration={form.register('notes')}
          error={form.formState.errors.notes?.message}
          disabled={loading || success}
        />

        {serverError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-200">
            {serverError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || success}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneCall className="h-4 w-4" />}
          Request a demo call
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
            <div>We never ask for OTPs. Calls are scheduled with opt-in confirmation.</div>
          </div>
        </div>
      </motion.form>

      <AnimatePresence>
        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(2,6,23,0.18)] dark:border-white/10 dark:bg-[#0B1020]"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500 text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Request received</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    We will contact you soon to confirm the slot and understand your needs.
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Close
                </button>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  Browse services
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function TextField({
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
      <input
        disabled={disabled}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100 disabled:opacity-60 dark:border-white/10 dark:bg-[#0B1020] dark:text-white dark:focus:border-white/20 dark:focus:ring-white/5"
        {...registration}
      />
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
        rows={4}
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

