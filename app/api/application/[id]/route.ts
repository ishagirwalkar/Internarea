import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Application } from '@/lib/models/application';
import { isAdminAuthenticated } from '@/lib/server/admin-session';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    console.log('DELETE request received');
    console.log('Admin authenticated:', isAdminAuthenticated(_request));

    if (!isAdminAuthenticated(_request)) {
      return NextResponse.json({ message: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    console.log('Application ID to delete:', id);

    await connectToDatabase();
    console.log('Database connected');

    const deletedApplication = await Application.findByIdAndDelete(id).lean();
    console.log('Deleted application:', deletedApplication);

    if (!deletedApplication) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Application deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete application',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 },
    );
  }
}
