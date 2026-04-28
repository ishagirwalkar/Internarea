'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Briefcase, GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { getInternships, type InternshipData } from '@/lib/internships';
import { getJobs, type JobData } from '@/lib/jobs';

type SearchResult = {
  type: 'internship' | 'job';
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        const [internshipData, jobData] = await Promise.all([
          getInternships().catch(() => []),
          getJobs().catch(() => []),
        ]);

        if (!cancelled) {
          setInternships(internshipData);
          setJobs(jobData);
        }
      } catch (error) {
        console.error('Failed to load search data:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search internships
    internships.forEach((internship) => {
      const title = internship.title || '';
      const company = internship.company || '';
      const location = internship.location || '';
      const about = internship.aboutInternship || '';
      const skills = internship.skillsRequired || [];
      const tags = internship.tags || [];
      
      if (
        title.toLowerCase().includes(searchTerm) ||
        company.toLowerCase().includes(searchTerm) ||
        location.toLowerCase().includes(searchTerm) ||
        about.toLowerCase().includes(searchTerm) ||
        skills.some(s => (s || '').toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          type: 'internship',
          id: internship.id,
          title,
          company,
          location,
          description: about,
          tags,
        });
      }
    });

    // Search jobs
    jobs.forEach((job) => {
      const title = job.title || '';
      const company = (job as any).companyName || (job as any).company || job.company || '';
      const location = job.location || '';
      const about = job.aboutJob || job.description || '';
      const skills = job.skillsRequired || [];
      const tags = job.tags || [];
      
      if (
        title.toLowerCase().includes(searchTerm) ||
        company.toLowerCase().includes(searchTerm) ||
        location.toLowerCase().includes(searchTerm) ||
        about.toLowerCase().includes(searchTerm) ||
        skills.some(s => (s || '').toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          type: 'job',
          id: job.id,
          title,
          company,
          location,
          description: about,
          tags,
        });
      }
    });

    return searchResults;
  }, [query, internships, jobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedQuery = searchQuery.trim();
    if (normalizedQuery) {
      window.location.href = `/search?q=${encodeURIComponent(normalizedQuery)}`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Search className="ml-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships, jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent px-2 py-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <span className="ml-3 text-gray-600">Searching...</span>
          </div>
        ) : query ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Found in internships and jobs
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={result.type === 'internship' ? `/internships/${result.id}` : `/jobs/${result.id}`}
                    className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {result.type === 'internship' ? (
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Briefcase className="h-5 w-5 text-emerald-600" />
                          )}
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            result.type === 'internship' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {result.type === 'internship' ? 'Internship' : 'Job'}
                          </span>
                        </div>
                        <h2 className="mt-2 text-lg font-semibold text-gray-900">{result.title}</h2>
                        <p className="mt-1 text-sm text-gray-600">{result.company}</p>
                        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {result.location}
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-gray-600">{result.description}</p>
                        {result.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {result.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-300" />
                <h2 className="mt-4 text-lg font-semibold text-gray-900">No results found</h2>
                <p className="mt-2 text-gray-600">
                  Try different keywords or browse our{' '}
                  <Link href="/internships" className="text-blue-600 hover:underline">
                    internships
                  </Link>{' '}
                  and{' '}
                  <Link href="/jobs" className="text-blue-600 hover:underline">
                    jobs
                  </Link>
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">Search for opportunities</h2>
            <p className="mt-2 text-gray-600">
              Enter keywords to search internships and jobs
            </p>
          </div>
        )}
      </div>
    </main>
  );
}