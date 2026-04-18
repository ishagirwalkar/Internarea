import { notFound } from 'next/navigation';
import { getInternshipById } from '@/lib/internships';
import ListingDetailsPage from '../../../components/ListingDetailsPage';
import { getSampleInternshipById } from '../../../lib/sample-listings';

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sampleInternship = getSampleInternshipById(id);

  if (sampleInternship) {
    return <ListingDetailsPage listing={sampleInternship} listingType="internship" />;
  }

  const internship = await getInternshipById(id);

  if (!internship) {
    notFound();
  }

  return (
    <ListingDetailsPage
      listing={{
        id: internship.id,
        title: internship.title,
        company: internship.company,
        location: internship.location,
        compensation: internship.stipend,
        duration: internship.duration,
        postedDate: `Posted ${internship.postedDaysAgo}`,
        experience: '0-2 years',
        workFromHome: internship.location.toLowerCase().includes('remote'),
        partTime: internship.tags.some((tag) => tag.toLowerCase().includes('part-time')),
        companyWebsite: 'https://example.com',
        aboutCompany: internship.aboutCompany,
        aboutRole: internship.aboutInternship,
        whoCanApply: internship.whoCanApply.join(' '),
        perks: internship.perks,
        additionalInformation: internship.additionalInfo,
        openings: internship.openings,
      }}
      listingType="internship"
    />
  );
}
