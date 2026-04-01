'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Clock, DollarSign, Briefcase, Dot } from 'lucide-react';
import { JobData, SAMPLE_JOBS } from '../../lib/jobs';

interface JobFilter {
  category: string;
  location: string;
  workFromHome: boolean;
  partTime: boolean;
  minSalary: number;
  maxSalary: number;
}

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilter>({
    category: '',
    location: '',
    workFromHome: false,
    partTime: false,
    minSalary: 0,
    maxSalary: 300,
  });

  const [jobs] = useState<JobData[]>(SAMPLE_JOBS);

  const handleFilterChange = <K extends keyof JobFilter>(field: K, value: JobFilter[K]) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      location: '',
      workFromHome: false,
      partTime: false,
      minSalary: 0,
      maxSalary: 300,
    });
  };

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.workFromHome ? 1 : 0) +
    (filters.partTime ? 1 : 0) +
    (filters.minSalary > 0 || filters.maxSalary < 300 ? 1 : 0);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      !filters.category ||
      job.title.toLowerCase().includes(filters.category.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.category.toLowerCase());

    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesWorkFromHome =
      !filters.workFromHome ||
      job.remote ||
      job.location.toLowerCase().includes('remote');

    const matchesPartTime =
      !filters.partTime ||
      job.type.toLowerCase() === 'part-time';

    const matchesSalary =
      job.salaryMax >= filters.minSalary && job.salaryMin <= filters.maxSalary;

    return matchesCategory && matchesLocation && matchesWorkFromHome && matchesPartTime && matchesSalary;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600 mt-2">Find your perfect full-time or part-time opportunity.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-32 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Marketing Intern"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="job-wfh"
                    checked={filters.workFromHome}
                    onChange={(e) => handleFilterChange('workFromHome', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="job-wfh" className="text-sm font-medium text-gray-700 cursor-pointer">Work from home</label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="job-part-time"
                    checked={filters.partTime}
                    onChange={(e) => handleFilterChange('partTime', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="job-part-time" className="text-sm font-medium text-gray-700 cursor-pointer">Part-time</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Salary (K)</label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        step="10"
                        value={filters.minSalary}
                        onChange={(e) => handleFilterChange('minSalary', Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>₹{filters.minSalary}K</span>
                        <span>₹{filters.maxSalary}K</span>
                      </div>
                    </div>

                    <div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        step="10"
                        value={filters.maxSalary}
                        onChange={(e) => handleFilterChange('maxSalary', Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="flex justify-between text-xs font-medium text-gray-700 pt-1">
                      <span>₹0K</span>
                      <span>₹150K</span>
                      <span>₹300K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-700 font-medium">{filteredJobs.length} Jobs found</p>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 border border-gray-100">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {job.activelyHiring && (
                        <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Actively Hiring</div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-5 py-4 border-y border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg"><Calendar size={18} className="text-blue-600" /></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Start</p>
                        <p className="text-sm font-bold text-gray-900">{job.startDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-orange-50 rounded-lg"><Clock size={18} className="text-orange-600" /></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Duration</p>
                        <p className="text-sm font-bold text-gray-900">{job.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg"><DollarSign size={18} className="text-green-600" /></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Salary</p>
                        <p className="text-sm font-bold text-gray-900">{job.salary}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{job.type}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
                        <Dot size={16} className="text-green-500" />
                        Posted {job.posted}
                      </div>
                    </div>

                    <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-colors">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
