import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/jobs';
import JobDetailsClient from './JobDetailsClient';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClient job={job} />;
}
