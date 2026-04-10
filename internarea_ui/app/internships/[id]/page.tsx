import { notFound } from 'next/navigation';
import { getInternshipById } from '@/lib/internships';
import InternshipDetailsClient from './InternshipDetailsClient';

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const internship = await getInternshipById(id);

  if (!internship) {
    notFound();
  }

  return <InternshipDetailsClient internship={internship} />;
}
