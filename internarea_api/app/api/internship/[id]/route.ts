import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Internship } from '@/lib/models/internship';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getBackendBaseUrl() {
  return (process.env.BACKEND_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
}

async function fetchBackendInternshipById(id: string) {
  const response = await fetch(`${getBackendBaseUrl()}/api/internship/${id}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = (await response.json().catch(() => null)) as unknown;

  if (response.status === 404) {
    return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }

  if (!response.ok) {
    const backendMessage =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message?: string }).message || '')
        : '';

    throw new Error(backendMessage || 'Backend internship fetch failed');
  }

  return NextResponse.json(data);
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();
    const internship = await Internship.findById(id).lean();

    if (!internship) {
      return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
    }

    return NextResponse.json(internship);
  } catch (error) {
    try {
      const { id } = await context.params;
      return await fetchBackendInternshipById(id);
    } catch (fallbackError) {
      const primaryMessage = error instanceof Error ? error.message : 'Unknown error';
      const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : 'Unknown fallback error';

    return NextResponse.json(
      {
        message: 'Failed to fetch internship',
        error: `${primaryMessage}; backend fallback failed: ${fallbackMessage}`,
      },
      { status: 500 },
    );
    }
  }
}