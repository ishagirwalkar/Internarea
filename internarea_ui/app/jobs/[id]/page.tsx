import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/jobs';
import ListingDetailsPage from '../../../components/ListingDetailsPage';
import { getSampleJobById } from '../../../lib/sample-listings';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sampleJob = getSampleJobById(id);

  if (sampleJob) {
    return <ListingDetailsPage listing={sampleJob} listingType="job" />;
  }

  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <ListingDetailsPage
      listing={{
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        compensation: job.salary,
        duration: job.duration,
        postedDate: `Posted ${job.posted}`,
        experience: '0-2 years',
        workFromHome: job.remote,
        partTime: job.type === 'Part-time',
        companyWebsite: job.companyWebsite,
        aboutCompany: job.aboutCompany,
        aboutRole: job.aboutRole,
        whoCanApply: job.whoCanApply.join(' '),
        perks: job.perks,
        additionalInformation: job.additionalInfo,
        openings: job.openings,
      }}
      listingType="job"
    />
  );
}
