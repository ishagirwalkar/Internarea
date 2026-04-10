'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Building2, Check, ExternalLink, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  ApplicationData,
  ApplicationStatus,
  getApplications,
  updateApplicationStatus,
} from '@/lib/applications';

const FILTER_TABS: Array<'All' | ApplicationStatus> = ['All', 'Pending', 'Approved', 'Rejected'];

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Approved: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-rose-100 text-rose-700',
};

export default function ProfilePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | ApplicationStatus>('All');
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

  const activeApplicationsCount = applications.filter((item) => item.status === 'Pending').length;
  const acceptedApplicationsCount = applications.filter((item) => item.status === 'Approved').length;

  const filteredApplications = useMemo(() => {
    const text = search.trim().toLowerCase();

    return applications.filter((item) => {
      const matchesTab = activeTab === 'All' ? true : item.status === activeTab;
      const matchesSearch =
        text.length === 0 ||
        item.company.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text) ||
        item.applicantName.toLowerCase().includes(text) ||
        item.applicantEmail.toLowerCase().includes(text);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, applications, search]);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      setMessage('');
      const updatedApplication = await updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((item) => (item.id === id ? updatedApplication : item)));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update application status');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500" />

          <div className="px-6 pb-8">
            <div className="-mt-14 flex flex-col items-center text-center">
              <Image
                src="https://i.pravatar.cc/160?img=12"
                alt="Rahul profile"
                width={112}
                height={112}
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
              />
              <h1 className="mt-4 text-2xl font-bold text-slate-900">Rahul</h1>
              <p className="mt-1 text-sm text-slate-500">rahul@example.com</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-medium text-blue-700">Active Applications</p>
                <p className="mt-2 text-3xl font-bold text-blue-900">{activeApplicationsCount}</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-medium text-emerald-700">Accepted Applications</p>
                <p className="mt-2 text-3xl font-bold text-emerald-900">{acceptedApplicationsCount}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/my-applications"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                View Applications
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Applications</h2>
            <p className="mt-1 text-sm text-slate-500">
              Track and manage your job and internship applications
            </p>
          </div>

          {message && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {message}
            </div>
          )}

          <div className="mt-5">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by company, category, or applicant..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {FILTER_TABS.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 space-y-3 md:hidden">
            {loading ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                Loading applications...
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No applications found for this filter.
              </div>
            ) : (
              filteredApplications.map((application) => (
                <article key={application.id} className="rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-slate-900">
                        <Building2 size={16} className="text-blue-600" />
                        <p className="font-semibold">{application.company}</p>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{application.category}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-slate-700">
                    <p className="font-medium">{application.applicantName}</p>
                    <p className="text-xs text-slate-500">{application.applicantEmail}</p>
                    <p className="mt-2 text-xs text-slate-500">Applied: {application.appliedDate}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                    <Link href="#" className="font-medium text-blue-600 hover:text-blue-700">
                      {application.listingType}
                    </Link>
                    <button
                      type="button"
                      onClick={() => updateStatus(application.id, 'Approved')}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1.5 font-medium text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <Check size={14} />
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(application.id, 'Rejected')}
                      className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1.5 font-medium text-rose-700 transition hover:bg-rose-100"
                    >
                      <X size={14} />
                      Reject
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="mt-6 hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Company and Category</th>
                  <th className="px-4 py-3">Applicant</th>
                  <th className="px-4 py-3">Applied Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      Loading applications...
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      No applications found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-2">
                          <Building2 size={16} className="mt-0.5 text-blue-600" />
                          <div>
                            <p className="font-semibold text-slate-900">{application.company}</p>
                            <p className="text-xs text-slate-500">{application.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900">{application.applicantName}</p>
                        <p className="text-xs text-slate-500">{application.applicantEmail}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{application.appliedDate}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[application.status]}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link href="#" className="font-medium text-blue-600 hover:text-blue-700">
                            {application.listingType}
                          </Link>
                          <button
                            type="button"
                            onClick={() => updateStatus(application.id, 'Approved')}
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1.5 font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            <Check size={14} />
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(application.id, 'Rejected')}
                            className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1.5 font-medium text-rose-700 transition hover:bg-rose-100"
                          >
                            <X size={14} />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}