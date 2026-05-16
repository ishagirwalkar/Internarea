'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type AdminAuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if this is the admin login page
    const isLoginPage = pathname === '/admin' || pathname === '/admin/';
    
    if (isLoginPage) {
      // Don't check auth on login page
      setIsLoading(false);
      return;
    }

    // Check if admin session cookie exists
    const checkAdminSession = async () => {
      try {
        // Try to fetch admin protected route to verify session
        const response = await fetch('/api/admin/verify-session', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Redirect to admin login
          router.push('/admin');
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSession();
  }, [pathname, router]);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
