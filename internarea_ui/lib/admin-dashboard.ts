import 'server-only';

import { connectToDatabase, getDatabaseMode } from '@/lib/mongodb';
import { Application } from '@/lib/models/application';
import { Internship } from '@/lib/models/internship';
import { Job } from '@/lib/models/job';

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
    await connectToDatabase();

    const [totalApplications, approvedApplications, pendingApplications, jobsCount, internshipsCount] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: 'approved' }),
      Application.countDocuments({ status: 'pending' }),
      Job.countDocuments(),
      Internship.countDocuments(),
    ]);

    return {
      totalApplications,
      approvedApplications,
      pendingApplications,
      jobsCount,
      internshipsCount,
      databaseMode: getDatabaseMode(),
    } satisfies AdminDashboardStats;
  } catch (error) {
    return {
      totalApplications: 0,
      approvedApplications: 0,
      pendingApplications: 0,
      jobsCount: 0,
      internshipsCount: 0,
      databaseMode: getDatabaseMode(),
      message: error instanceof Error ? error.message : 'Failed to load admin stats',
    };
  }
}