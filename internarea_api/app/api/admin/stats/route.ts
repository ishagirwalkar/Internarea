import { NextResponse } from 'next/server';

import { connectToDatabase, getDatabaseMode } from '@/lib/mongodb';
import { Application } from '@/lib/models/application';
import { Internship } from '@/lib/models/internship';
import { Job } from '@/lib/models/job';

export async function GET() {
  try {
    await connectToDatabase();

    const [totalApplications, approvedApplications, pendingApplications, jobsCount, internshipsCount] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: 'approved' }),
      Application.countDocuments({ status: 'pending' }),
      Job.countDocuments(),
      Internship.countDocuments(),
    ]);

    return NextResponse.json({
      totalApplications,
      approvedApplications,
      pendingApplications,
      jobsCount,
      internshipsCount,
      databaseMode: getDatabaseMode(),
    });
  } catch (error) {
    return NextResponse.json({
      totalApplications: 0,
      approvedApplications: 0,
      pendingApplications: 0,
      jobsCount: 0,
      internshipsCount: 0,
      databaseMode: getDatabaseMode(),
      message: error instanceof Error ? error.message : 'Failed to load admin stats',
    });
  }
}