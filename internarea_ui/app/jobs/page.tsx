'use client';

import { useEffect, useMemo, useState } from 'react';
import FiltersSidebar, { type FiltersSidebarValue } from '../../components/FilterSidebar';
import JobCard from '../../components/JobCard';
import { parseCompensationToAnnualLakhs } from '@/lib/listing-filters';
import { getJobs, type JobData } from '../../lib/jobs';

const defaultFilters: FiltersSidebarValue = {
  category: '',
  location: '',
  experience: '',
  salary: 50,
  workFromHome: false,
  partTime: false,
};

export default function JobsPage() {
  const [filters, setFilters] = useState<FiltersSidebarValue>(defaultFilters);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        setLoading(true);
        setError('');
        const response = await getJobs();

        if (!cancelled) {
          setJobs(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load jobs.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory =
        !filters.category ||
        job.title.toLowerCase().includes(filters.category.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.category.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.category.toLowerCase());

      const matchesLocation =
        !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesExperience =
        !filters.experience ||
        job.duration.toLowerCase().includes(filters.experience.toLowerCase()) ||
        job.type.toLowerCase().includes(filters.experience.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.experience.toLowerCase());

      const matchesSalary = parseCompensationToAnnualLakhs(job.salary) <= filters.salary;
      const matchesWorkFromHome = !filters.workFromHome || job.remote;
      const matchesPartTime = !filters.partTime || job.type.toLowerCase() === 'part-time';

      return (
        matchesCategory &&
        matchesLocation &&
        matchesExperience &&
        matchesSalary &&
        matchesWorkFromHome &&
        matchesPartTime
      );
    });
  }, [filters, jobs]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Latest job opportunities</h2>
              <p className="mt-2 text-sm text-slate-500">{filteredJobs.length} active roles across engineering, design, data, and product.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FiltersSidebar value={filters} onChange={setFilters} onClear={() => setFilters(defaultFilters)} />
            </div>

            <div>
              {error ? (
                <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700 shadow-sm">
                  {error}
                </div>
              ) : null}

              {loading ? (
                <div className="rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                  Loading jobs...
                </div>
              ) : null}

              {!loading ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={`/jobs/${job.id}`}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    compensation={job.salary}
                    duration={job.duration}
                  />
                ))}
              </div> : null}

              {!loading && filteredJobs.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                  {jobs.length === 0 ? 'No jobs posted yet.' : 'No roles match the selected filters. Try clearing a few filters.'}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
