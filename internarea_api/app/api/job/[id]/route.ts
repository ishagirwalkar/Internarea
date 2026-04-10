import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Job } from '@/lib/models/job';

type RouteContext = {
	params: Promise<{
		id: string;
	}>;
};

export async function GET(_request: Request, context: RouteContext) {
	try {
		const { id } = await context.params;

		await connectToDatabase();
		const job = await Job.findById(id).lean();

		if (!job) {
			return NextResponse.json({ message: 'Job not found' }, { status: 404 });
		}

		return NextResponse.json(job);
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Failed to fetch job',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 },
		);
	}
}
