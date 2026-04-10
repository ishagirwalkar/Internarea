import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Application } from '@/lib/models/application';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const normalizeStatus = (value: unknown) => {
  const status = typeof value === 'string' ? value.trim().toLowerCase() : '';

  if (status === 'approved' || status === 'rejected' || status === 'pending') {
    return status;
  }

  return 'pending';
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;

    await connectToDatabase();
    const application = await Application.findByIdAndUpdate(
      id,
      { status: normalizeStatus(body.status) },
      { new: true, runValidators: true },
    ).lean();

    if (!application) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to update application status',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 },
    );
  }
}