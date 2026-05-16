'use client';

import { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Calendar,
  Loader,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { AdminHeader, AdminContent, AdminCard, AdminGrid, StatBox } from '@/components/AdminComponents';

interface AnalyticsData {
  totalUsers: number;
  totalJobs: number;
  totalInternships: number;
  totalApplications: number;
  approvedApplications: number;
  pendingApplications: number;
  rejectedApplications: number;
  conversionRate: number;
  applicationsThisMonth: number;
  usersThisMonth: number;
  jobsThisMonth: number;
  internshipsThisMonth: number;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  bgColor,
  textColor,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  bgColor: string;
  textColor: string;
  trend?: { value: number; direction: 'up' | 'down' };
}) => (
  <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <div className={`${bgColor} rounded-lg p-3`}>
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend.direction === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
          <TrendingUp className="h-4 w-4" />
          {trend.value}%
        </div>
      )}
    </div>
    <h3 className="text-slate-600 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
    {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'year'

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        console.error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const csvContent = [
      ['Platform Analytics Report'],
      ['Generated on', new Date().toLocaleDateString()],
      [''],
      ['Total Users', analytics?.totalUsers],
      ['Total Jobs', analytics?.totalJobs],
      ['Total Internships', analytics?.totalInternships],
      ['Total Applications', analytics?.totalApplications],
      ['Approved Applications', analytics?.approvedApplications],
      ['Pending Applications', analytics?.pendingApplications],
      ['Rejected Applications', analytics?.rejectedApplications],
      ['Conversion Rate (%)', analytics?.conversionRate.toFixed(2)],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <AdminHeader
        title="Analytics Dashboard"
        description="Real-time platform statistics and insights"
        action={
          <button
            onClick={downloadReport}
            disabled={!analytics}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:bg-slate-400 transition"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        }
      />

      <AdminContent>
        {/* Date Range Filter */}
        <div className="mb-8 flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                dateRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-600">Loading analytics...</span>
          </div>
        ) : !analytics ? (
          <div className="flex items-center justify-center py-12 text-slate-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            Failed to load analytics
          </div>
        ) : (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Key Metrics</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Users"
                  value={analytics.totalUsers}
                  subtitle={`${analytics.usersThisMonth} new this month`}
                  icon={Users}
                  bgColor="bg-blue-100"
                  textColor="text-blue-600"
                  trend={{ value: 12, direction: 'up' }}
                />
                <StatCard
                  title="Job Listings"
                  value={analytics.totalJobs}
                  subtitle={`${analytics.jobsThisMonth} new this month`}
                  icon={Briefcase}
                  bgColor="bg-emerald-100"
                  textColor="text-emerald-600"
                  trend={{ value: 8, direction: 'up' }}
                />
                <StatCard
                  title="Internships"
                  value={analytics.totalInternships}
                  subtitle={`${analytics.internshipsThisMonth} new this month`}
                  icon={CheckCircle}
                  bgColor="bg-purple-100"
                  textColor="text-purple-600"
                  trend={{ value: 15, direction: 'up' }}
                />
                <StatCard
                  title="Conversion Rate"
                  value={`${analytics.conversionRate.toFixed(2)}%`}
                  subtitle="Approved / Total Applications"
                  icon={BarChart3}
                  bgColor="bg-orange-100"
                  textColor="text-orange-600"
                />
              </div>
            </div>

            {/* Applications Overview */}
            <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="mb-6 text-xl font-bold text-slate-900">Applications Overview</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                  <p className="text-sm font-medium text-blue-700">Total Applications</p>
                  <p className="mt-2 text-3xl font-bold text-blue-900">{analytics.totalApplications}</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-blue-200">
                    <div className="h-full w-full rounded-full bg-blue-600"></div>
                  </div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
                  <p className="text-sm font-medium text-emerald-700">Approved</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-900">{analytics.approvedApplications}</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-emerald-200">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{
                        width: `${(analytics.approvedApplications / analytics.totalApplications) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 p-6">
                  <p className="text-sm font-medium text-amber-700">Pending</p>
                  <p className="mt-2 text-3xl font-bold text-amber-900">{analytics.pendingApplications}</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-amber-200">
                    <div
                      className="h-full rounded-full bg-amber-600"
                      style={{
                        width: `${(analytics.pendingApplications / analytics.totalApplications) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-red-50 to-red-100 p-6">
                  <p className="text-sm font-medium text-red-700">Rejected</p>
                  <p className="mt-2 text-3xl font-bold text-red-900">{analytics.rejectedApplications}</p>
                  <div className="mt-3 h-2 w-full rounded-full bg-red-200">
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{
                        width: `${(analytics.rejectedApplications / analytics.totalApplications) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Link
                href="/admin/manage-users"
                className="rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">Manage Users</h3>
                  <p className="text-sm text-slate-600">View all registered users</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </Link>
              <Link
                href="/admin/applications"
                className="rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">Applications</h3>
                  <p className="text-sm text-slate-600">{analytics.totalApplications} applications</p>
                </div>
                <AlertCircle className="h-8 w-8 text-emerald-600" />
              </Link>
              <Link
                href="/admin/settings"
                className="rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">Settings</h3>
                  <p className="text-sm text-slate-600">Configure platform</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </Link>
            </div>
          </div>
        )}
      </AdminContent>
    </div>
  );
}
