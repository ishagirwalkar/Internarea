'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  BarChart3,
  Settings,
  Mail,
  FileText,
  Menu,
  X,
  Briefcase,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutGrid,
  },
  {
    label: 'Applications',
    href: '/admin/applications',
    icon: Mail,
  },
  {
    label: 'Manage Users',
    href: '/admin/manage-users',
    icon: Users,
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    label: 'Post Job',
    href: '/admin/post-job',
    icon: Briefcase,
  },
  {
    label: 'Post Internship',
    href: '/admin/post-internship',
    icon: FileText,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    label: 'Logout',
    action: 'logout',
    icon: LogOut,
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      // Ignore logout fetch errors and proceed to redirect
    } finally {
      router.replace('/');
    }
  };

  // Don't render if still loading or on login page
  if (isLoading || !isAuthenticated || pathname === '/admin' || pathname === '/admin/') {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:block lg:h-screen lg:w-64 lg:bg-slate-900 lg:shadow-lg lg:overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="border-b border-slate-700 px-6 py-4">
            <Link href="/admin/dashboard" className="text-2xl font-bold text-white">
              Admin
            </Link>
            <p className="text-xs text-slate-400 mt-1">Platform Control Panel</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isLogoutItem = item.action === 'logout';
              const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'));

              if (isLogoutItem) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-700 px-3 py-4">
            {/* Logout removed from admin sidebar */}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 lg:hidden bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin/dashboard" className="text-xl font-bold text-slate-900">
            Admin
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 px-2 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isLogoutItem = item.action === 'logout';
              const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'));

              if (isLogoutItem) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      void handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </>
  );
}
