'use client';

import { Check, Search, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  ApplicationData,
  ApplicationStatus,
  deleteApplication,
  getApplications,
  updateApplicationStatus,
} from '@/lib/applications';

type FilterStatus = 'All' | ApplicationStatus;

const statusButtonOrder: FilterStatus[] = ['All', 'Pending', 'Approved', 'Rejected'];

const statusBadgeClassMap: Record<ApplicationStatus, string> = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [query, setQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState<FilterStatus>('All');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [deletingId, setDeletingId] = useState('');

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

  const filteredApplications = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesStatus = activeStatus === 'All' || application.status === activeStatus;

      const matchesQuery =
        !lowerQuery ||
        application.company.toLowerCase().includes(lowerQuery) ||
        application.category.toLowerCase().includes(lowerQuery) ||
        application.applicantName.toLowerCase().includes(lowerQuery) ||
        application.applicantEmail.toLowerCase().includes(lowerQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeStatus, applications, query]);

  const handleStatusUpdate = async (id: string, status: ApplicationStatus) => {
    try {
      setUpdatingId(id);
      setMessage('');

      const updatedApplication = await updateApplicationStatus(id, status);
      setApplications((current) =>
        current.map((application) => (application.id === id ? updatedApplication : application))
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update application status');
    } finally {
      setUpdatingId('');
    }
  };

  const handleDeleteApplication = async (id: string) => {
    const confirmDelete = window.confirm('Delete this application record? This action cannot be undone.');

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setMessage('');

      await deleteApplication(id);
      setApplications((current) => current.filter((application) => application.id !== id));
      setMessage('Application deleted successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to delete application');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Applications</h1>
          <p className="mt-2 text-slate-600">Manage and review all applications</p>
        </header>

        <section className="rounded-xl bg-white p-6 shadow-md">
          {message && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {message}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="application-search" className="sr-only">
              Search applications
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                id="application-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by company, category, or applicant..."
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {statusButtonOrder.map((status) => {
              const isActive = activeStatus === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveStatus(status)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Company &amp; Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Applicant</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Applied Date</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading && filteredApplications.map((application) => (
                  <tr key={application.id} className="rounded-lg bg-slate-50 hover:bg-slate-100">
                    <td className="rounded-l-lg px-4 py-3 align-top">
                      <p className="font-semibold text-slate-900">{application.company}</p>
                      <p className="text-sm text-slate-600">{application.category}</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-slate-900">{application.applicantName}</p>
                      <p className="text-sm text-slate-600">{application.applicantEmail}</p>
                      <p className="text-sm text-slate-500">{application.phoneNumber}</p>
                      <p className="text-sm text-slate-500">Resume: {application.resumeFileName}</p>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-700">{application.appliedDate}</td>
                    <td className="px-4 py-3 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClassMap[application.status]}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="rounded-r-lg px-4 py-3 align-top">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium capitalize text-slate-600">
                          {application.listingType}
                        </span>
                        <button
                          type="button"
                          aria-label="Approve application"
                          disabled={updatingId === application.id}
                          onClick={() => handleStatusUpdate(application.id, 'Approved')}
                          className="rounded-md bg-emerald-100 p-2 text-emerald-700 transition hover:bg-emerald-200 disabled:opacity-60"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label="Reject application"
                          disabled={updatingId === application.id || deletingId === application.id}
                          onClick={() => handleStatusUpdate(application.id, 'Rejected')}
                          className="rounded-md bg-red-100 p-2 text-red-700 transition hover:bg-red-200 disabled:opacity-60"
                        >
                          <X size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete application"
                          disabled={updatingId === application.id || deletingId === application.id}
                          onClick={() => handleDeleteApplication(application.id)}
                          className="rounded-md bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 disabled:opacity-60"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="mt-4 rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600">
              Loading applications...
            </div>
          )}

          {!loading && filteredApplications.length === 0 && (
            <div className="mt-4 rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600">
              No applications found for the current search/filter.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
