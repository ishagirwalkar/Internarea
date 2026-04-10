'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, DollarSign, Briefcase, Dot } from 'lucide-react';
import { getInternships, InternshipData } from '@/lib/internships';

interface InternshipFilter {
  category: string;
  location: string;
  workFromHome: boolean;
  partTime: boolean;
  minStipend: number;
  maxStipend: number;
}

const stipendFormatter = new Intl.NumberFormat('en-IN');

export default function InternshipsPage() {
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState<InternshipFilter>({
    category: '',
    location: '',
    workFromHome: false,
    partTime: false,
    minStipend: 0,
    maxStipend: 100000,
  });

  useEffect(() => {
    let isMounted = true;

    const loadInternships = async () => {
      try {
        setLoading(true);
        setMessage('');

        const nextInternships = await getInternships();

        if (isMounted) {
          setInternships(nextInternships);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(error instanceof Error ? error.message : 'Failed to fetch internships');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadInternships();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilterChange = <K extends keyof InternshipFilter>(
    field: K,
    value: InternshipFilter[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      location: '',
      workFromHome: false,
      partTime: false,
      minStipend: 0,
      maxStipend: 100000,
    });
  };

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.workFromHome ? 1 : 0) +
    (filters.partTime ? 1 : 0) +
    (filters.minStipend > 0 || filters.maxStipend < 100000 ? 1 : 0);

  const filteredInternships = useMemo(
    () =>
      internships.filter((internship) => {
        const matchesCategory =
          !filters.category ||
          internship.title.toLowerCase().includes(filters.category.toLowerCase()) ||
          internship.company.toLowerCase().includes(filters.category.toLowerCase()) ||
          internship.tags.some((tag) => tag.toLowerCase().includes(filters.category.toLowerCase()));

        const matchesLocation =
          !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());

        const matchesWorkFromHome =
          !filters.workFromHome || internship.location.toLowerCase().includes('remote');

        const matchesPartTime =
          !filters.partTime || internship.tags.some((tag) => tag.toLowerCase().includes('part-time'));

        const stipendValues = [...internship.stipend.matchAll(/\d+(?:,\d+)*/g)].map((match) =>
          Number(match[0].replace(/,/g, ''))
        );

        const stipendMin = stipendValues[0] ?? 0;
        const stipendMax = stipendValues[1] ?? stipendMin;
        const matchesStipend = stipendMax >= filters.minStipend && stipendMin <= filters.maxStipend;

        return matchesCategory && matchesLocation && matchesWorkFromHome && matchesPartTime && matchesStipend;
      }),
    [filters, internships]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Internship Opportunities
          </h1>
          <p className="text-gray-600 mt-2">
            Find your perfect internship match from thousands of opportunities
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-32 h-fit">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Category Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marketing Intern"
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange('category', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange('location', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Work from Home Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="wfh"
                    checked={filters.workFromHome}
                    onChange={(e) =>
                      handleFilterChange('workFromHome', e.target.checked)
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="wfh" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Work from home
                  </label>
                </div>

                {/* Part-time Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="part-time"
                    checked={filters.partTime}
                    onChange={(e) =>
                      handleFilterChange('partTime', e.target.checked)
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="part-time" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Part-time
                  </label>
                </div>

                {/* Stipend Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Monthly Stipend
                  </label>
                  <div className="space-y-3">
                    {/* Min Stipend */}
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="5000"
                        value={filters.minStipend}
                        onChange={(e) =>
                          handleFilterChange('minStipend', parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>₹{stipendFormatter.format(filters.minStipend)}</span>
                        <span>₹{stipendFormatter.format(filters.maxStipend)}</span>
                      </div>
                    </div>

                    {/* Max Stipend */}
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="5000"
                        value={filters.maxStipend}
                        onChange={(e) =>
                          handleFilterChange('maxStipend', parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between text-xs font-medium text-gray-700 pt-1">
                      <span>₹0</span>
                      <span>₹50K</span>
                      <span>₹100K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Listings */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">
                {loading ? 'Loading internships...' : `${filteredInternships.length} Internships found`}
              </p>
            </div>

            {message && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {message}
              </div>
            )}

            {/* Internship Cards */}
            <div className="space-y-4">
              {!loading && filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 border border-gray-100"
                >
                  {/* Top Section - Badge and Title */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {internship.activelyHiring && (
                        <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                          Actively Hiring
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {internship.title}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {internship.company}
                      </p>
                    </div>
                  </div>

                  {/* Details Row - Icons */}
                  <div className="grid grid-cols-3 gap-6 mb-5 py-4 border-y border-gray-100">
                    {/* Start Date */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                        <Calendar size={18} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Start</p>
                        <p className="text-sm font-bold text-gray-900">
                          {internship.startDate}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-orange-50 rounded-lg">
                        <Clock size={18} className="text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">
                          Duration
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {internship.duration}
                        </p>
                      </div>
                    </div>

                    {/* Stipend */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg">
                        <DollarSign size={18} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">
                          Stipend
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {internship.stipend}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Tags and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Tag */}
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {internship.tags[0]}
                      </span>

                      {/* Posted Recently */}
                      <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
                        <Dot size={16} className="text-green-500" />
                        Posted {internship.postedDaysAgo}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/internships/${internship.id}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {!loading && filteredInternships.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No internships found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
