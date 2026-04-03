import { notFound } from 'next/navigation';
import { SAMPLE_INTERNSHIPS, InternshipData } from '@/lib/internships';
import InternshipDetailsClient from './InternshipDetailsClient';

function getInternshipById(id: string): InternshipData | undefined {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  return SAMPLE_INTERNSHIPS.find((internship) => internship.id === numericId);
}

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const internship = getInternshipById(id);

  if (!internship) {
    notFound();
  }

  return <InternshipDetailsClient internship={internship} />;
}
