import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import DemoBookingForm from '../../components/forms/demo-booking-form';

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070A12] dark:text-slate-50">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-1/2 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_62%)]" />
          <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.20),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                Consultation booking
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Book a demo call
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Talk to our team to map the cleanest workflow for your business. We recommend services, timelines, and next steps - without paperwork chaos.
              </p>

              <div className="mt-8 grid gap-3">
                <InfoCard title="What you get" items={['Service recommendations', 'Timelines and pricing', 'Document checklist']} />
                <InfoCard title="Call format" items={['15-20 minutes', 'WhatsApp follow-up', 'Action plan summary']} />
              </div>
            </div>

            <div className="relative lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(2,6,23,0.10)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-7">
                <DemoBookingForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

