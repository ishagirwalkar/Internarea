import { apiFetch } from './api';

type AdminDashboardStats = {
  totalApplications: number;
  approvedApplications: number;
  pendingApplications: number;
  jobsCount: number;
  internshipsCount: number;
  databaseMode: string;
  message?: string;
};

export async function getAdminDashboardStats() {
  try {
    return await apiFetch<AdminDashboardStats>('/api/admin/stats');
  } catch (error) {
    return {
      totalApplications: 0,
      approvedApplications: 0,
      pendingApplications: 0,
      jobsCount: 0,
      internshipsCount: 0,
      databaseMode: 'disconnected',
      message: error instanceof Error ? error.message : 'Failed to load admin stats',
    };
  }
}