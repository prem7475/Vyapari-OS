import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import ContactForm from '../../components/forms/contact-form';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070A12] dark:text-slate-50">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-1/2 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.20),transparent_62%)]" />
          <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                Contact
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Talk to us
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Sales, support, partnerships, or onboarding questions - reach out and we will respond quickly. For urgent support, WhatsApp is fastest.
              </p>

              <div className="mt-8 grid gap-3">
                <ContactCard title="WhatsApp" value="WhatsApp support (fastest)" href="https://wa.me/?text=Hi%20Vyapari%20OS%2C%20I%20need%20help%20with%20onboarding." />
                <ContactCard title="Email" value="hello@vyapari.os" href="mailto:hello@vyapari.os" />
                <ContactCard title="Office" value="Mumbai, Pune, Bengaluru (by appointment)" />
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">Quick answers</div>
                <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <Bullet>We never ask for OTPs over call or WhatsApp.</Bullet>
                  <Bullet>Service timelines depend on document readiness - we help reduce rework.</Bullet>
                  <Bullet>Most founders start with GST or FSSAI, then expand into compliance tracking.</Bullet>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-white/10 dark:bg-black/20">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">FAQ preview</div>
                <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <FaqRow q="How fast do you reply?" a="Most messages get a response within one business day." />
                  <FaqRow q="Can I book a walkthrough?" a="Yes - use Book Demo to schedule a call slot." />
                  <FaqRow q="Do you handle follow-ups?" a="Yes - we guide you through next actions inside the workflow." />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactCard({ title, value, href }: { title: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
      <div className="text-xs text-slate-500 dark:text-slate-400">{title}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
      <span>{children}</span>
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-sm font-semibold text-slate-900 dark:text-white">{q}</div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{a}</div>
    </div>
  );
}

