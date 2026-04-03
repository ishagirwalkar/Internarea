import Link from 'next/link';
import { Briefcase, ClipboardList, ShieldCheck, Users } from 'lucide-react';

const dashboardCards = [
  {
    title: 'Internships',
    value: '24',
    description: 'Active internship listings',
    icon: Briefcase,
  },
  {
    title: 'Applications',
    value: '128',
    description: 'Submitted this month',
    icon: ClipboardList,
  },
  {
    title: 'Admins',
    value: '4',
    description: 'Team members with access',
    icon: ShieldCheck,
  },
  {
    title: 'Candidates',
    value: '860',
    description: 'Registered applicants',
    icon: Users,
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-8 shadow-xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage internships and applications</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              This starter dashboard is the destination for the admin login flow and can be extended with listing management, approvals, and reporting.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Login
          </Link>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title} className="rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
                  </div>
                  <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                    <Icon size={22} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">{card.description}</p>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}