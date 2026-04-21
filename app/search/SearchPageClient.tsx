'use client';

import Link from 'next/link';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';

import JobCard from '@/components/JobCard';
import { getInternships, type InternshipData } from '@/lib/internships';
import { getJobs, type JobData } from '@/lib/jobs';

type SearchPageClientProps = {
  query: string;
};

function includesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

export default function SearchPageClient({ query }: SearchPageClientProps) {
  const deferredQuery = useDeferredValue(query);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadListings() {
      try {
        setLoading(true);
        setError('');
        const [jobsResponse, internshipsResponse] = await Promise.all([getJobs(), getInternships()]);

        if (!cancelled) {
          setJobs(jobsResponse);
          setInternships(internshipsResponse);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load search results.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadListings();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    if (!deferredQuery) {
      return [];
    }

    return jobs.filter((job) =>
      [job.title, job.company, job.location, job.description, job.aboutRole, job.type].some((value) =>
        includesQuery(value, deferredQuery),
      ),
    );
  }, [deferredQuery, jobs]);

  const filteredInternships = useMemo(() => {
    if (!deferredQuery) {
      return [];
    }

    return internships.filter((internship) =>
      [
        internship.title,
        internship.company,
        internship.location,
        internship.aboutInternship,
        internship.duration,
        internship.tags.join(' '),
      ].some((value) => includesQuery(value, deferredQuery)),
    );
  }, [deferredQuery, internships]);

  const totalResults = filteredJobs.length + filteredInternships.length;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4f8_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.2),_transparent_30%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] px-6 py-10 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Search</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Search opportunities</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50/90">
              Find jobs and internships across the platform using title, company, location, or role details.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <Search size={16} />
              <span>{query || 'Type a search in the navbar to begin.'}</span>
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700 shadow-sm">
            {error}
          </div>
        ) : null}

        {!query ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-900">Start with a keyword in the navbar search.</p>
            <p className="mt-2 text-sm text-slate-500">Try role names, companies, locations, or skill-based terms.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/jobs" className="rounded-xl border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-blue-50">
                Browse jobs
              </Link>
              <Link href="/internships" className="rounded-xl border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-blue-50">
                Browse internships
              </Link>
            </div>
          </section>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
            Loading search results...
          </div>
        ) : null}

        {query && !loading ? (
          <section className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{totalResults} results found</h2>
                <p className="mt-1 text-sm text-slate-500">Showing matches for "{query}" across jobs and internships.</p>
              </div>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Jobs</h3>
                  <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700">
                    <span>View all jobs</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={`job-${job.id}`}
                        id={`/jobs/${job.id}`}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        compensation={job.salary}
                        duration={job.duration}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-sm text-slate-500 shadow-sm">
                    No jobs matched your search.
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Internships</h3>
                  <Link href="/internships" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700">
                    <span>View all internships</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
                {filteredInternships.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredInternships.map((internship) => (
                      <JobCard
                        key={`internship-${internship.id}`}
                        id={`/internships/${internship.id}`}
                        title={internship.title}
                        company={internship.company}
                        location={internship.location}
                        compensation={internship.stipend}
                        duration={internship.duration}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-sm text-slate-500 shadow-sm">
                    No internships matched your search.
                  </div>
                )}
              </section>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
