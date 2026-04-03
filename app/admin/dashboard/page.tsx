import Link from 'next/link';
import { BarChart3, Briefcase, Mail, Send, Settings, Users } from 'lucide-react';

const statsCards = [
  {
    title: 'Total Applications',
    value: '2,345',
    growth: '+12%',
    growthColor: 'text-emerald-600',
  },
  {
    title: 'Active Jobs',
    value: '45',
    growth: '+3%',
    growthColor: 'text-emerald-600',
  },
  {
    title: 'Active Internships',
    value: '89',
    growth: '+24%',
    growthColor: 'text-emerald-600',
  },
  {
    title: 'Conversion Rate',
    value: '5.25%',
    growth: '-1.3%',
    growthColor: 'text-red-600',
  },
];

const actionCards = [
  {
    title: 'View Applications',
    description: 'View and manage all applications from candidates',
    icon: Mail,
    iconStyle: 'bg-blue-100 text-blue-600',
    href: '/admin/applications',
  },
  {
    title: 'Post Job',
    description: 'Create and publish new job opportunities',
    icon: Briefcase,
    iconStyle: 'bg-emerald-100 text-emerald-600',
    href: '/admin/post-job',
  },
  {
    title: 'Post Internship',
    description: 'Create and manage internship positions',
    icon: Send,
    iconStyle: 'bg-purple-100 text-purple-600',
    href: '/admin/post-internship',
  },
  {
    title: 'Manage Users',
    description: 'View and manage user accounts',
    icon: Users,
    iconStyle: 'bg-orange-100 text-orange-600',
    href: '/admin/users',
  },
  {
    title: 'Analytics',
    description: 'View detailed reports and statistics',
    icon: BarChart3,
    iconStyle: 'bg-red-100 text-red-600',
    href: '/admin/analytics',
  },
  {
    title: 'Settings',
    description: 'Configure system preferences',
    icon: Settings,
    iconStyle: 'bg-slate-200 text-slate-600',
    href: '/admin/settings',
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-8 shadow-md">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome back, Admin</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Track platform performance and quickly jump into key management actions from one place.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Login
          </Link>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((card) => {
            return (
              <article
                key={card.title}
                className="cursor-pointer rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
                <p className={`mt-3 text-sm font-semibold ${card.growthColor}`}>{card.growth}</p>
              </article>
            );
          })}
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-600">Manage core admin tasks with one click.</p>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {actionCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link key={card.title} href={card.href}>
                  <article className="cursor-pointer rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-3 ${card.iconStyle}`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}