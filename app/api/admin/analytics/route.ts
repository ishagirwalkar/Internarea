import { connectToDatabase, getDatabaseMode } from '@/lib/mongodb';
import { Application } from '@/lib/models/application';
import { Job } from '@/lib/models/job';
import { Internship } from '@/lib/models/internship';
import User from '@/lib/models/user';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'month';

    await connectToDatabase();

    // Calculate date range
    const now = new Date();
    const startDate = new Date();

    if (range === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (range === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (range === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    // Get total counts
    const [
      totalUsers,
      totalJobs,
      totalInternships,
      totalApplications,
      approvedApplications,
      pendingApplications,
      rejectedApplications,
    ] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Internship.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ status: 'approved' }),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'rejected' }),
    ]);

    // Get counts for the selected date range
    const [usersThisRange, jobsThisRange, internshipsThisRange, applicationsThisRange] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: startDate } }),
      Job.countDocuments({ createdAt: { $gte: startDate } }),
      Internship.countDocuments({ createdAt: { $gte: startDate } }),
      Application.countDocuments({ createdAt: { $gte: startDate } }),
    ]);

    // Calculate conversion rate
    const conversionRate = totalApplications === 0 ? 0 : (approvedApplications / totalApplications) * 100;

    return Response.json({
      totalUsers,
      totalJobs,
      totalInternships,
      totalApplications,
      approvedApplications,
      pendingApplications,
      rejectedApplications,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      applicationsThisMonth: applicationsThisRange,
      usersThisMonth: usersThisRange,
      jobsThisMonth: jobsThisRange,
      internshipsThisMonth: internshipsThisRange,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
