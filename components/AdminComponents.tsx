import { ReactNode } from 'react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  stats?: { label: string; value: string | number }[];
}

export function AdminHeader({
  title,
  description,
  action,
  stats,
}: AdminHeaderProps) {
  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            {description && (
              <p className="mt-1 text-slate-600">{description}</p>
            )}
            {stats && stats.length > 0 && (
              <div className="mt-4 flex gap-6 flex-wrap">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}

interface AdminContentProps {
  children: ReactNode;
}

export function AdminContent({ children }: AdminContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

interface AdminCardProps {
  children: ReactNode;
  className?: string;
}

export function AdminCard({ children, className = '' }: AdminCardProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-sm border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

interface AdminGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function AdminGrid({ children, columns = 3 }: AdminGridProps) {
  const colClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid gap-4 grid-cols-1 ${colClass}`}>
      {children}
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: 'blue' | 'emerald' | 'purple' | 'orange' | 'red' | 'slate';
  icon?: ReactNode;
  trend?: { value: number; direction: 'up' | 'down' };
}

export function StatBox({
  label,
  value,
  color = 'blue',
  icon,
  trend,
}: StatBoxProps) {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' },
  }[color];

  return (
    <div className={`rounded-lg border p-6 ${colorClasses.border} ${colorClasses.bg}`}>
      <div className="flex items-center justify-between mb-4">
        {icon && <div className={colorClasses.text}>{icon}</div>}
        {trend && (
          <div className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className={`text-2xl font-bold mt-2 ${colorClasses.text}`}>{value}</p>
    </div>
  );
}
