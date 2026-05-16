'use client';

import { useEffect, useState } from 'react';
import ListingDetailsPage from '../../../components/ListingDetailsPage';
import { getInternshipById, type InternshipData } from '../../../lib/internships';

type InternshipDetailFetcherProps = {
  id: string;
};

function mapInternshipToListing(internship: InternshipData) {
  return {
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
  };
}

export default function InternshipDetailFetcher({ id }: InternshipDetailFetcherProps) {
  const [internship, setInternship] = useState<InternshipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadInternship() {
      try {
        setLoading(true);
        setError('');
        const response = await getInternshipById(id);

        if (!cancelled) {
          if (response) {
            setInternship(response);
          } else {
            setError('Internship not found');
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load internship');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInternship();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-600 shadow-md">
          Loading internship details...
        </div>
      </main>
    );
  }

  if (error || !internship) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-md">
          <h1 className="text-2xl font-bold text-slate-900">Internship Not Found</h1>
          <p className="mt-2 text-slate-600">
            {error || "The internship you're looking for doesn't exist or has been removed."}
          </p>
          <a
            href="/internships"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse Internships
          </a>
        </div>
      </main>
    );
  }

  return <ListingDetailsPage listing={mapInternshipToListing(internship)} listingType="internship" />;
}