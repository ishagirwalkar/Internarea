import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Internship } from '@/lib/models/internship';
import { isAdminAuthenticated } from '@/lib/server/admin-session';

type InternshipPayload = {
  title: string;
  location: string;
  companyName: string;
  category: string;
  aboutCompany: string;
  aboutInternship: string;
  whoCanApply: string[];
  perks: string[];
  numberOfOpenings: number;
  stipend: string;
  startDate: string;
  additionalInfo: string;
  workMode: string;
  duration: string;
};

const getString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const toStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/) 
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const buildPayload = (body: Record<string, unknown>): InternshipPayload => ({
  title: getString(body.title),
  location: getString(body.location),
  companyName: getString(body.companyName),
  category: getString(body.category),
  aboutCompany: getString(body.aboutCompany),
  aboutInternship: getString(body.aboutInternship),
  whoCanApply: toStringArray(body.whoCanApply),
  perks: toStringArray(body.perks),
  numberOfOpenings: Number(body.numberOfOpenings),
  stipend: getString(body.stipend),
  startDate: getString(body.startDate),
  additionalInfo: getString(body.additionalInfo),
  workMode: getString(body.workMode) || 'Remote',
  duration: getString(body.duration) || '3 months',
});

export async function GET() {
  try {
    await connectToDatabase();
    const internships = await Internship.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(internships);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch internships',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Admin authorization required' },
        { status: 401 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const payload = buildPayload(body);

    if (!payload.title || !payload.companyName || !payload.location || !payload.aboutInternship) {
      return NextResponse.json(
        { message: 'Missing required internship fields' },
        { status: 400 },
      );
    }

    if (!Number.isFinite(payload.numberOfOpenings) || payload.numberOfOpenings < 1) {
      return NextResponse.json(
        { message: 'Number of openings must be at least 1' },
        { status: 400 },
      );
    }

    await connectToDatabase();
    const internship = await Internship.create(payload);

    return NextResponse.json(internship, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Failed to create internship',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 },
    );
  }
}