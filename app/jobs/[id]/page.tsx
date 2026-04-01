'use client';

import Link from 'next/link';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle, MapPin, Calendar, Clock, DollarSign, ExternalLink, X } from 'lucide-react';
import { SAMPLE_JOBS, JobData } from '../../../lib/jobs';

function getJobById(id: string): JobData | undefined {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  return SAMPLE_JOBS.find((job) => job.id === numericId);
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [availability, setAvailability] = useState('Immediate');

  if (!job) {
    notFound();
  }

  if (!job) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/jobs" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            ← Back to Jobs
          </Link>
          <span className="text-sm font-semibold text-gray-600">{job.openings} Openings</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </div>

        <article className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                <CheckCircle size={14} /> Actively Hiring
              </span>
              <span className="text-sm text-gray-500">Posted {job.posted}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg font-semibold text-gray-700">{job.company}</p>
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm md:text-base">
              <span className="inline-flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
              <span className="inline-flex items-center gap-2"><DollarSign size={16} /> {job.salary}</span>
              <span className="inline-flex items-center gap-2"><Clock size={16} /> {job.duration}</span>
              <span className="inline-flex items-center gap-2"><Calendar size={16} /> {job.startDate}</span>
            </div>
          </header>

          <section className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-900">About Company</h2>
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                Website <ExternalLink size={14} />
              </a>
            </div>
            <p className="text-gray-700">{job.aboutCompany}</p>
          </section>

          <section className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About the Job</h2>
            <p className="text-gray-700">{job.description}</p>
          </section>

          <section className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Who can apply</h2>
            <ul className="grid gap-2 text-gray-700">
              {job.whoCanApply.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Perks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Certificate', 'LOR', 'Flexible hours'].map((perk) => (
                <div key={perk} className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-700">
                  {perk}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Additional Information</h2>
            <p className="text-gray-700">{job.additionalInfo}</p>
          </section>

          <section className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Number of Openings</h2>
            <p className="text-gray-700 mt-2">{job.openings} position{job.openings === 1 ? '' : 's'}</p>
          </section>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 transition shadow-md"
            >
              Apply Now
            </button>
          </div>
        </article>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10 transform transition-all duration-300 ease-out animate-scaleFade">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply Now</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Paste your resume details"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write a short cover letter"
                />
              </div>

              <fieldset className="border border-gray-200 rounded-xl p-4">
                <legend className="text-sm font-medium text-gray-700">Availability</legend>
                <div className="mt-2 grid gap-2">
                  {['Immediate', 'On notice period', 'Serve notice period', 'Other'].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-gray-700 text-sm">
                      <input
                        type="radio"
                        name="availability"
                        value={option}
                        checked={availability === option}
                        onChange={() => setAvailability(option)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                onClick={() => {
                  console.log('Apply submitted', { resumeText, coverLetter, availability });
                  setIsModalOpen(false);
                }}
                className="w-full rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition"
              >
                Sign up to apply
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleFade {
          0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-scaleFade {
          animation: scaleFade 220ms ease-out forwards;
        }
      `}</style>
    </main>
  );
}
