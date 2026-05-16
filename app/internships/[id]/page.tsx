import InternshipDetailFetcher from './InternshipDetailFetcher';

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InternshipDetailFetcher id={id} />;
}
