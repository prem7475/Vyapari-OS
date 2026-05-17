'use client';

import clsx from 'clsx';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useId } from 'react';

export type PhoneInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string | null;
  hint?: string;
  disabled?: boolean;
  name?: string;
  autoFocus?: boolean;
};

export default function PhoneInput({
  label,
  value,
  onChange,
  onBlur,
  placeholder = '10-digit mobile number',
  error,
  hint,
  disabled,
  name,
  autoFocus,
}: PhoneInputProps) {
  const id = useId();
  const inputId = `${id}-phone`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </label>
        {hint ? (
          <div id={hintId} className="text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </div>
        ) : null}
      </div>

      <div
        className={clsx(
          'group relative rounded-2xl border bg-white shadow-sm transition focus-within:ring-4 dark:bg-[#0B1020]',
          error
            ? 'border-rose-300 focus-within:ring-rose-100 dark:border-rose-500/40 dark:focus-within:ring-rose-500/10'
            : 'border-slate-200 focus-within:ring-slate-100 dark:border-white/10 dark:focus-within:ring-white/5',
        )}
      >
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          <Phone className="h-4 w-4" />
        </div>

        <div className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">+91</div>

        <input
          id={inputId}
          name={name}
          autoFocus={autoFocus}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d\s+-]/g, '');
            onChange(raw);
          }}
          onBlur={onBlur}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={clsx(
            'h-12 w-full rounded-2xl bg-transparent pl-[4.1rem] pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white',
            disabled ? 'opacity-60' : 'opacity-100',
          )}
        />
      </div>

      {error ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-700 dark:text-rose-200"
          id={errorId}
          role="alert"
        >
          {error}
        </motion.div>
      ) : null}
    </div>
  );
}
