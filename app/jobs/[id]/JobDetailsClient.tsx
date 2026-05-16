'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ListingDetailsPage from '../../../components/ListingDetailsPage';
import { getJobById, type JobData } from '../../../lib/jobs';
import { getSampleJobById, generateSampleJobFromId } from '../../../lib/sample-listings';

type JobDetailsClientProps = {
  id: string;
};

function mapJobToListing(job: JobData) {
  return {
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
  };
}

export default function JobDetailsClient({ id }: JobDetailsClientProps) {
  const sampleJob = getSampleJobById(id);
  const generatedSampleJob = generateSampleJobFromId(id);
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(!sampleJob);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sampleJob) {
      return;
    }

    let cancelled = false;

    async function loadJob() {
      try {
        setLoading(true);
        setError('');
        const response = await getJobById(id);

        if (!cancelled) {
          setJob(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError('');
          setJob(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadJob();

    return () => {
      cancelled = true;
    };
  }, [id, sampleJob]);

  if (sampleJob) {
    return <ListingDetailsPage listing={sampleJob} listingType="job" />;
  }

  if (job) {
    return <ListingDetailsPage listing={mapJobToListing(job)} listingType="job" />;
  }

  // Use generated sample job if no data from backend
  if (!loading && !error) {
    return <ListingDetailsPage listing={generatedSampleJob} listingType="job" />;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-600 shadow-md">
          Loading job details...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-md">
        <p className="text-base font-semibold text-slate-900">Job details not available.</p>
        <Link
          href="/jobs"
          className="mt-4 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Browse jobs
        </Link>
      </div>
    </main>
  );
}
