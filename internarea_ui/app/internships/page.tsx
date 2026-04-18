'use client';

import { useEffect, useMemo, useState } from 'react';
import FiltersSidebar, { type FiltersSidebarValue } from '../../components/FilterSidebar';
import JobCard from '../../components/JobCard';
import { getInternships, type InternshipData } from '../../lib/internships';

const defaultFilters: FiltersSidebarValue = {
  category: '',
  location: '',
  experience: '',
  salary: 50,
  workFromHome: false,
  partTime: false,
};

function parseAnnualLakhs(compensation: string) {
  const digits = compensation.replace(/[^\d]/g, '');

  if (!digits) {
    return 0;
  }

  const monthlySalary = Number(digits);
  return (monthlySalary * 12) / 100000;
}

export default function InternshipsPage() {
  const [filters, setFilters] = useState<FiltersSidebarValue>(defaultFilters);
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadInternships() {
      try {
        setLoading(true);
        setError('');
        const response = await getInternships();

        if (!cancelled) {
          setInternships(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load internships.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInternships();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const matchesCategory =
        !filters.category ||
        internship.title.toLowerCase().includes(filters.category.toLowerCase()) ||
        internship.company.toLowerCase().includes(filters.category.toLowerCase()) ||
        internship.aboutInternship.toLowerCase().includes(filters.category.toLowerCase());

      const matchesLocation =
        !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesExperience =
        !filters.experience || internship.duration.toLowerCase().includes(filters.experience.toLowerCase());

      const matchesSalary = parseAnnualLakhs(internship.stipend) <= filters.salary;
      const matchesWorkFromHome =
        !filters.workFromHome ||
        internship.location.toLowerCase().includes('remote') ||
        internship.tags.some((tag) => tag.toLowerCase().includes('remote'));
      const matchesPartTime = !filters.partTime || internship.tags.some((tag) => tag.toLowerCase().includes('part-time'));

      return (
        matchesCategory &&
        matchesLocation &&
        matchesExperience &&
        matchesSalary &&
        matchesWorkFromHome &&
        matchesPartTime
      );
    });
  }, [filters, internships]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_24%),linear-gradient(180deg,_#f9fbfd_0%,_#eef3f8_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Featured internships</h2>
              <p className="mt-2 text-sm text-slate-500">{filteredInternships.length} actively hiring internships across leading global companies.</p>
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
                  Loading internships...
                </div>
              ) : null}

              {!loading ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
                {filteredInternships.map((internship) => (
                  <JobCard
                    key={internship.id}
                    id={`/internships/${internship.id}`}
                    title={internship.title}
                    company={internship.company}
                    location={internship.location}
                    compensation={internship.stipend}
                    duration={internship.duration}
                  />
                ))}
              </div> : null}

              {!loading && filteredInternships.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                  {internships.length === 0 ? 'No internships posted yet.' : 'No internships match the selected filters. Try clearing a few filters.'}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
