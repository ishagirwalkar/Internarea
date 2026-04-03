'use client';

import Link from 'next/link';
import { Check, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type ApplicationStatus = 'Approved' | 'Pending' | 'Rejected';
type FilterStatus = 'All' | ApplicationStatus;

type Application = {
  company: string;
  category: string;
  applicantName: string;
  applicantEmail: string;
  appliedDate: string;
  status: ApplicationStatus;
};

const applications: Application[] = [
  {
    company: 'Tech Corp',
    category: 'Software',
    applicantName: 'John Doe',
    applicantEmail: 'john@example.com',
    appliedDate: '2024-03-10',
    status: 'Approved',
  },
  {
    company: 'Health Solutions',
    category: 'Healthcare',
    applicantName: 'Jane Smith',
    applicantEmail: 'jane@example.com',
    appliedDate: '2024-03-08',
    status: 'Pending',
  },
  {
    company: 'EduLearn',
    category: 'Education',
    applicantName: 'Alice Johnson',
    applicantEmail: 'alice@example.com',
    appliedDate: '2024-03-05',
    status: 'Rejected',
  },
];

const statusButtonOrder: FilterStatus[] = ['All', 'Pending', 'Approved', 'Rejected'];

const statusBadgeClassMap: Record<ApplicationStatus, string> = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function ApplicationsPage() {
  const [query, setQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState<FilterStatus>('All');

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
  }, [activeStatus, query]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Applications</h1>
          <p className="mt-2 text-slate-600">Manage and review all applications</p>
        </header>

        <section className="rounded-xl bg-white p-6 shadow-md">
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
                onChange={(e) => setQuery(e.target.value)}
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
                {filteredApplications.map((application) => (
                  <tr key={`${application.company}-${application.applicantEmail}`} className="rounded-lg bg-slate-50 hover:bg-slate-100">
                    <td className="rounded-l-lg px-4 py-3 align-top">
                      <p className="font-semibold text-slate-900">{application.company}</p>
                      <p className="text-sm text-slate-600">{application.category}</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-slate-900">{application.applicantName}</p>
                      <p className="text-sm text-slate-600">{application.applicantEmail}</p>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-700">{application.appliedDate}</td>
                    <td className="px-4 py-3 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClassMap[application.status]}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="rounded-r-lg px-4 py-3 align-top">
                      <div className="flex items-center gap-3">
                        <Link href="#" className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
                          View Details
                        </Link>
                        <button
                          type="button"
                          aria-label="Approve application"
                          className="rounded-md bg-emerald-100 p-2 text-emerald-700 transition hover:bg-emerald-200"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label="Reject application"
                          className="rounded-md bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="mt-4 rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600">
              No applications found for the current search/filter.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
