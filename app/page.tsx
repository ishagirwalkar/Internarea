'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlider } from '@/context/SliderContext';
import { getInternships, type InternshipData } from '@/lib/internships';
import { getJobs, type JobData } from '@/lib/jobs';
import JobCard from '@/internarea_ui/components/JobCard';

const SLIDER_SLIDES = [
  {
    id: 1,
    title: 'Start Your Career Journey',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    title: 'Learn From The Best',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    id: 3,
    title: 'Grow Your Skills',
    gradient: 'from-cyan-500 to-blue-700',
  },
  {
    id: 4,
    title: 'Connect With Top Companies',
    gradient: 'from-indigo-500 to-purple-700',
  },
];

const CATEGORIES = [
  'Big Brands',
  'Work From Home',
  'Part-time',
  'MBA',
  'Engineering',
  'Media',
  'Design',
  'Data Science',
];

const STATS = [
  {
    id: 1,
    number: '300K+',
    label: 'companies hiring',
  },
  {
    id: 2,
    number: '10K+',
    label: 'new openings everyday',
  },
  {
    id: 3,
    number: '21Mn+',
    label: 'active students',
  },
  {
    id: 4,
    number: '600K+',
    label: 'learners',
  },
];

// Hero Section with Slider
function HeroSection() {
  const { currentSlide, setCurrentSlide } = useSlider();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [setCurrentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? SLIDER_SLIDES.length - 1 : prev - 1
    );
  };

  return (
    <section className="px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
            Make your dream career a reality
          </h1>
          <p className="text-lg md:text-xl text-gray-600">Trending on InternArea</p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Slider */}
          <div className="relative overflow-hidden rounded-2xl h-72 md:h-96 lg:h-[450px]">
            {SLIDER_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className={`w-full h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center`}
                >
                  <div className="text-center px-6">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                      {slide.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-3 transition-all duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100 md:opacity-100 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-3 transition-all duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100 md:opacity-100 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDER_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  return (
    <section className="px-4 py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Popular Categories
        </h2>

        {/* Horizontal Scrollable Categories */}
        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 min-w-min px-4 md:px-0 md:justify-center md:flex-wrap">
            {CATEGORIES.map((category, index) => (
              <button
                key={index}
                className="px-6 py-3 rounded-full bg-white text-gray-700 font-medium border-2 border-gray-200 whitespace-nowrap transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 transform hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Internships Section
function InternshipsSection({ internships, loading, error }: { internships: InternshipData[]; loading: boolean; error: string }) {
  return (
    <section
      id="internships"
      className="scroll-mt-20 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_24%),linear-gradient(180deg,_#f9fbfd_0%,_#eef3f8_100%)] px-4 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto">
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

        {!loading ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {internships.map((internship) => (
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

        {!loading && internships.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
            No internships posted yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}

// Jobs Section
function JobsSection({ jobs, loading, error }: { jobs: JobData[]; loading: boolean; error: string }) {
  return (
    <section
      id="jobs"
      className="scroll-mt-20 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto">
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

        {!loading ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {jobs.map((job) => (
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

        {!loading && jobs.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
            No jobs posted yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="px-4 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
                {stat.number}
              </h3>
              <p className="text-gray-700 font-medium text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [internshipsLoading, setInternshipsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');
  const [internshipsError, setInternshipsError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadListings() {
      try {
        setJobsLoading(true);
        setJobsError('');
        const response = await getJobs();

        if (!cancelled) {
          setJobs(response.slice(0, 6));
        }
      } catch (error) {
        if (!cancelled) {
          setJobsError(error instanceof Error ? error.message : 'Failed to load jobs.');
        }
      } finally {
        if (!cancelled) {
          setJobsLoading(false);
        }
      }

      try {
        setInternshipsLoading(true);
        setInternshipsError('');
        const response = await getInternships();

        if (!cancelled) {
          setInternships(response.slice(0, 6));
        }
      } catch (error) {
        if (!cancelled) {
          setInternshipsError(error instanceof Error ? error.message : 'Failed to load internships.');
        }
      } finally {
        if (!cancelled) {
          setInternshipsLoading(false);
        }
      }
    }

    void loadListings();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CategoriesSection />
      <InternshipsSection internships={internships} loading={internshipsLoading} error={internshipsError} />
      <JobsSection jobs={jobs} loading={jobsLoading} error={jobsError} />
      <StatsSection />
    </main>
  );
}
    