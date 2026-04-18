import JobDetailsClient from '../../../internarea_ui/app/jobs/[id]/JobDetailsClient';

export default async function JobDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <JobDetailsClient id={id} />;
}