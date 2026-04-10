import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Internship } from '@/lib/models/internship';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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
    return NextResponse.json(
      {
        message: 'Failed to fetch internship',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}