'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';
import { ApplicationData, getApplications } from '@/lib/applications';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadApplications = async () => {
      try {
        setLoading(true);
        setMessage('');

        const nextApplications = await getApplications();

        if (isMounted) {
          setApplications(nextApplications);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(error instanceof Error ? error.message : 'Failed to fetch applications');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadApplications();

    return () => {
      isMounted = false;
    };
  }, []);

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
              Review the applications submitted from the jobs and internships pages.
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
          {message && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              {message}
            </div>
          )}

          {!loading && applications.length > 0 && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-3 text-emerald-700">
                <CheckCircle2 size={20} />
                <h2 className="text-lg font-semibold">{applications.length} application(s) found</h2>
              </div>
              <p className="mt-2 text-sm text-emerald-800">
                Your latest submissions are now being loaded directly from the application API.
              </p>
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3 text-slate-800">
                <FileText size={20} />
                <h2 className="text-lg font-semibold">No stored records yet</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Submit a job or internship application to see it here.
              </p>
            </div>
          ) : (
            applications.map((application) => (
              <article key={application.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{application.company}</p>
                    <p className="mt-1 text-sm text-slate-600">{application.category}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {application.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <p>Applicant: {application.applicantName}</p>
                  <p>Email: {application.applicantEmail}</p>
                  <p>Applied: {application.appliedDate}</p>
                  <p className="capitalize">Type: {application.listingType}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}