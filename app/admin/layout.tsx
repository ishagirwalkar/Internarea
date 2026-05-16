import AdminNavigation from '@/components/AdminNavigation';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="flex">
        <AdminNavigation />
        <main className="w-full lg:ml-64">
          {children}
        </main>
      </div>
    </AdminAuthProvider>
  );
}
