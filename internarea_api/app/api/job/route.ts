import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { Job } from '@/lib/models/job';

type JobPayload = {
	title: string;
	location: string;
	companyName: string;
	category: string;
	aboutCompany: string;
	aboutJob: string;
	whoCanApply: string[];
	perks: string[];
	numberOfOpenings: number;
	stipend: string;
	startDate: string;
	additionalInfo: string;
	employmentType: string;
	workMode: string;
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

const buildPayload = (body: Record<string, unknown>): JobPayload => ({
	title: getString(body.title),
	location: getString(body.location),
	companyName: getString(body.companyName),
	category: getString(body.category),
	aboutCompany: getString(body.aboutCompany),
	aboutJob: getString(body.aboutJob),
	whoCanApply: toStringArray(body.whoCanApply),
	perks: toStringArray(body.perks),
	numberOfOpenings: Number(body.numberOfOpenings),
	stipend: getString(body.stipend),
	startDate: getString(body.startDate),
	additionalInfo: getString(body.additionalInfo),
	employmentType: getString(body.employmentType) || 'Full-time',
	workMode: getString(body.workMode) || 'On-site',
});

export async function GET() {
	try {
		await connectToDatabase();
		const jobs = await Job.find().sort({ createdAt: -1 }).lean();
		return NextResponse.json(jobs);
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Failed to fetch jobs',
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
		const job = await Job.create(buildPayload(body));

		return NextResponse.json(job, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Failed to create job',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 400 },
		);
	}
}
