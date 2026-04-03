import Link from 'next/link';
import { CheckCircle2, FileText } from 'lucide-react';

export default function MyApplicationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              My Applications
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Your recent applications</h1>
            <p className="mt-2 text-sm text-slate-600">
              This placeholder page confirms the application flow and gives you a destination after submit.
            </p>
          </div>
          <Link
            href="/jobs"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Browse more jobs
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 size={20} />
              <h2 className="text-lg font-semibold">Application submitted successfully!</h2>
            </div>
            <p className="mt-2 text-sm text-emerald-800">
              Your latest application is being reviewed. You can extend this page later to list saved submissions from an API or database.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3 text-slate-800">
              <FileText size={20} />
              <h2 className="text-lg font-semibold">No stored records yet</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              This page is ready for future persistence once you connect the application form to a backend.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}