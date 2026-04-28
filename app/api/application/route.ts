import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Application } from '@/lib/models/application';

type ApplicationPayload = {
  listingType: 'job' | 'internship';
  listingId: string;
  company: string;
  category: string;
  applicantName: string;
  applicantEmail: string;
  phoneNumber: string;
  coverLetter: string;
  resumeFileName: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
};

const getString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const normalizeStatus = (value: unknown): ApplicationPayload['status'] => {
  const status = getString(value).toLowerCase();

  if (status === 'approved' || status === 'rejected' || status === 'pending') {
    return status;
  }

  return 'pending';
};

const normalizeListingType = (value: unknown): ApplicationPayload['listingType'] => {
  return getString(value).toLowerCase() === 'job' ? 'job' : 'internship';
};

const buildPayload = (body: Record<string, unknown>): ApplicationPayload => ({
  listingType: normalizeListingType(body.listingType),
  listingId: getString(body.listingId),
  company: getString(body.company),
  category: getString(body.category),
  applicantName: getString(body.applicantName),
  applicantEmail: getString(body.applicantEmail).toLowerCase(),
  phoneNumber: getString(body.phoneNumber),
  coverLetter: getString(body.coverLetter),
  resumeFileName: getString(body.resumeFileName),
  appliedDate: getString(body.appliedDate),
  status: normalizeStatus(body.status),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: Record<string, string> = {};

    const email = getString(searchParams.get('email'));
    const listingType = getString(searchParams.get('listingType'));

    if (email) {
      filters.applicantEmail = email.toLowerCase();
    }

    if (listingType === 'job' || listingType === 'internship') {
      filters.listingType = listingType;
    }

    await connectToDatabase();
    const applications = await Application.find(filters).sort({ createdAt: -1 }).lean();
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch applications',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    await connectToDatabase();
    const application = await Application.create(buildPayload(body));

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create application',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 },
    );
  }
}