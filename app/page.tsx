'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, DollarSign, Clock } from 'lucide-react';
import { useSlider } from '@/context/SliderContext';

type CardItem = {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
};

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

const INTERNSHIPS = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    stipend: '₹60,000/month',
    duration: '3 months',
  },
  {
    id: 2,
    title: 'Product Management Intern',
    company: 'Microsoft',
    location: 'Bangalore, India',
    stipend: '₹55,000/month',
    duration: '4 months',
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'Amazon',
    location: 'Seattle, WA',
    stipend: '₹65,000/month',
    duration: '3 months',
  },
  {
    id: 4,
    title: 'Frontend Developer Intern',
    company: 'Meta',
    location: 'San Francisco, CA',
    stipend: '₹70,000/month',
    duration: '3 months',
  },
  {
    id: 5,
    title: 'UX Design Intern',
    company: 'Apple',
    location: 'Cupertino, CA',
    stipend: '₹50,000/month',
    duration: '4 months',
  },
  {
    id: 6,
    title: 'DevOps Engineer Intern',
    company: 'IBM',
    location: 'Bangalore, India',
    stipend: '₹52,000/month',
    duration: '3 months',
  },
];

const JOBS = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    stipend: '$150,000-180,000/year',
    duration: 'Full-time',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Bangalore, India',
    stipend: '₹25-35 LPA',
    duration: 'Full-time',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'Seattle, WA',
    stipend: '$160,000-190,000/year',
    duration: 'Full-time',
  },
  {
    id: 4,
    title: 'Lead Frontend Engineer',
    company: 'Meta',
    location: 'San Francisco, CA',
    stipend: '$175,000-220,000/year',
    duration: 'Full-time',
  },
  {
    id: 5,
    title: 'Design Lead',
    company: 'Apple',
    location: 'Cupertino, CA',
    stipend: '$140,000-170,000/year',
    duration: 'Full-time',
  },
  {
    id: 6,
    title: 'Infrastructure Engineer',
    company: 'IBM',
    location: 'Bangalore, India',
    stipend: '₹30-40 LPA',
    duration: 'Full-time',
  },
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

// Card Component
function Card({ item, type = 'internship' }: { item: CardItem; type?: 'internship' | 'job' }) {
  const detailsHref = type === 'job' ? `/jobs/${item.id}` : `/internships/${item.id}`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
      {/* Tag */}
      <div className="bg-green-100 text-green-800 text-xs font-semibold px-4 py-2 inline-block m-4 rounded-full">
        Actively Hiring
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 font-medium mb-4">{item.company}</p>

        {/* Details Grid */}
        <div className="space-y-3 mb-6 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-blue-600 flex-shrink-0" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign size={18} className="text-green-600 flex-shrink-0" />
            <span className="text-blue-600 font-semibold">{item.stipend}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-orange-600 flex-shrink-0" />
            <span>{item.duration}</span>
          </div>
        </div>

        {/* Buttons */}
        <div>
          <Link
            href={detailsHref}
            className="block w-full text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-colors duration-300 transform hover:translate-y-[-2px]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

// Internships Section
function InternshipsSection() {
  return (
    <section id="internships" className="px-4 py-16 md:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Latest Internships on InternArea
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INTERNSHIPS.map((internship) => (
            <Card key={internship.id} item={internship} type="internship" />
          ))}
        </div>
      </div>
    </section>
  );
}

// Jobs Section
function JobsSection() {
  return (
    <section id="jobs" className="px-4 py-16 md:py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Latest Jobs
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JOBS.map((job) => (
            <Card key={job.id} item={job} type="job" />
          ))}
        </div>
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
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CategoriesSection />
      <InternshipsSection />
      <JobsSection />
      <StatsSection />
    </main>
  );
}
    