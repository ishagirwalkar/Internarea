import { notFound } from 'next/navigation';
import { SAMPLE_JOBS, JobData } from '../../../lib/jobs';
import JobDetailsClient from './JobDetailsClient';

function getJobById(id: string): JobData | undefined {
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return undefined;
  }

  return SAMPLE_JOBS.find((job) => job.id === numericId);
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClient job={job} />;
}
