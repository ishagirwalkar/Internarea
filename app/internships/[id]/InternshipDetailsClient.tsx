'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Briefcase, Calendar, CheckCircle, Clock, DollarSign, MapPin, Upload, X } from 'lucide-react';
import { InternshipData } from '@/lib/internships';

type ApplicationFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  resumeFile: File | null;
};

type ApplicationFormErrors = Partial<Record<keyof ApplicationFormData, string>>;

const initialFormData: ApplicationFormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  coverLetter: '',
  resumeFile: null,
};

export default function InternshipDetailsClient({ internship }: { internship: InternshipData }) {
  const router = useRouter();
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const resumeFile = event.target.files?.[0] ?? null;

    setFormData((current) => ({
      ...current,
      resumeFile,
    }));

    setErrors((current) => ({
      ...current,
      resumeFile: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors: ApplicationFormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone Number is required.';
    } else if (!/^[0-9+()\-\s]{7,}$/.test(formData.phoneNumber)) {
      nextErrors.phoneNumber = 'Enter a valid phone number.';
    }

    if (!formData.resumeFile) {
      nextErrors.resumeFile = 'Resume Upload is required.';
    }

    if (!formData.coverLetter.trim()) {
      nextErrors.coverLetter = 'Cover Letter is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitted(true);
    setErrors({});
  };

  const handleOpenApply = () => {
    setIsApplyOpen(true);
    setIsSubmitted(false);
  };

  const handleCloseApply = () => {
    setIsApplyOpen(false);
    setIsSubmitted(false);
    setErrors({});
    setFormData(initialFormData);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/internships" className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
            ← Back to Internships
          </Link>

          <button
            onClick={handleOpenApply}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-slate-900 px-6 py-8 text-white md:px-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {internship.activelyHiring && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 font-semibold">
                      <CheckCircle size={14} /> Actively Hiring
                    </span>
                  )}
                  <span className="rounded-full border border-white/20 px-3 py-1 font-medium">
                    Posted {internship.postedDaysAgo}
                  </span>
                </div>

                <div>
                  <h1 className="text-3xl font-bold md:text-4xl">{internship.title}</h1>
                  <p className="mt-2 text-lg text-blue-50">{internship.company}</p>
                </div>

                <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                    <MapPin size={16} />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                    <DollarSign size={16} />
                    <span>{internship.stipend}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                    <Clock size={16} />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                    <Calendar size={16} />
                    <span>{internship.startDate}</span>
                  </div>
                </div>
              </div>

              <div className="min-w-64 rounded-3xl bg-white p-5 text-slate-900 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Quick Snapshot</p>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <p className="text-slate-500">Company Name</p>
                    <p className="font-semibold">{internship.company}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Stipend/Salary</p>
                    <p className="font-semibold">{internship.stipend}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Number of openings</p>
                    <p className="font-semibold">{internship.openings}</p>
                  </div>
                  <button
                    onClick={handleOpenApply}
                    className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_0.9fr] md:p-10">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">About the role</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{internship.aboutInternship}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">About the company</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{internship.aboutCompany}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Skills required</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {internship.skillsRequired.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Role details</h2>
                <div className="mt-4 grid gap-4 text-sm text-slate-700">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-slate-500">Job Title</p>
                    <p className="mt-1 font-semibold text-slate-900">{internship.title}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-slate-500">Location</p>
                    <p className="mt-1 font-semibold text-slate-900">{internship.location}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-slate-500">Duration</p>
                    <p className="mt-1 font-semibold text-slate-900">{internship.duration}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-slate-500">Stipend/Salary</p>
                    <p className="mt-1 font-semibold text-slate-900">{internship.stipend}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Who can apply</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {internship.whoCanApply.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Additional info</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{internship.additionalInfo}</p>
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">Perks</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {internship.perks.map((perk) => (
                      <span key={perk} className="rounded-full bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={handleCloseApply} />

          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-medium text-blue-600">Application Form</p>
                <h2 className="text-2xl font-bold text-slate-900">Apply for {internship.title}</h2>
              </div>
              <button
                onClick={handleCloseApply}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close application form"
              >
                <X size={20} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="space-y-6 px-6 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Application submitted successfully!</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Your application for {internship.title} at {internship.company} has been recorded.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={() => router.push('/my-applications')}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Go to My Applications
                  </button>
                  <button
                    onClick={handleCloseApply}
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleFieldChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label htmlFor="resumeFile" className="mb-2 block text-sm font-medium text-slate-700">
                    Resume Upload
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 transition hover:border-blue-400 hover:bg-blue-50">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Upload size={18} className="text-blue-600" />
                      <span>{formData.resumeFile ? formData.resumeFile.name : 'Choose resume file'}</span>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                      Browse
                    </span>
                    <input
                      id="resumeFile"
                      name="resumeFile"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                    />
                  </label>
                  {errors.resumeFile && <p className="mt-2 text-sm text-red-600">{errors.resumeFile}</p>}
                </div>

                <div>
                  <label htmlFor="coverLetter" className="mb-2 block text-sm font-medium text-slate-700">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={5}
                    value={formData.coverLetter}
                    onChange={handleFieldChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Tell the company why you are a strong fit for this internship"
                  />
                  {errors.coverLetter && <p className="mt-2 text-sm text-red-600">{errors.coverLetter}</p>}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <Briefcase size={16} /> Application summary
                  </div>
                  <p className="mt-2">{internship.title} at {internship.company}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCloseApply}
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}