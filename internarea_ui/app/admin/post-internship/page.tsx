'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Briefcase, MapPin, Building2, Tag, Users, Gift, Calendar, Info } from 'lucide-react';
import { createInternship } from '@/lib/internships';

export default function PostInternshipPage() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    companyName: '',
    category: '',
    aboutCompany: '',
    aboutInternship: '',
    whoCanApply: '',
    perks: '',
    numberOfOpenings: '',
    stipend: '',
    startDate: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = [
      'title',
      'location',
      'companyName',
      'category',
      'aboutCompany',
      'aboutInternship',
      'whoCanApply',
      'perks',
      'numberOfOpenings',
      'stipend',
      'startDate',
      'additionalInfo',
    ];

    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      await createInternship(formData);

      setMessage({ tone: 'success', text: 'Internship posted successfully.' });
      setFormData({
        title: '',
        location: '',
        companyName: '',
        category: '',
        aboutCompany: '',
        aboutInternship: '',
        whoCanApply: '',
        perks: '',
        numberOfOpenings: '',
        stipend: '',
        startDate: '',
        additionalInfo: '',
      });
    } catch (error) {
      setMessage({
        tone: 'error',
        text: error instanceof Error ? error.message : 'Failed to post internship.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Post New Internship</h1>
          <p className="mt-2 text-slate-600">Create a new internship opportunity for students</p>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              message.tone === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-rose-200 bg-rose-50 text-rose-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-8 shadow-md">
          {/* Row 1: Title & Location */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Briefcase size={16} className="text-blue-600" />
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Software Engineering Intern"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="location" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <MapPin size={16} className="text-green-600" />
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Mumbai, India"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>
          </div>

          {/* Row 2: Company Name & Category */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="companyName" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Building2 size={16} className="text-purple-600" />
                Company Name*
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Tech Solutions Inc"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="category" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Tag size={16} className="text-orange-600" />
                Category*
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Technology, Finance"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
            </div>
          </div>

          {/* Row 3: About Company (Full Width) */}
          <div>
            <label htmlFor="aboutCompany" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Building2 size={16} className="text-indigo-600" />
              About Company*
            </label>
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              placeholder="Tell us about your company, its mission, and values"
              rows={4}
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.aboutCompany ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.aboutCompany && <p className="mt-1 text-xs text-red-600">{errors.aboutCompany}</p>}
          </div>

          {/* Row 4: About Internship (Full Width) */}
          <div>
            <label htmlFor="aboutInternship" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Briefcase size={16} className="text-cyan-600" />
              About *
            </label>
            <textarea
              id="aboutInternship"
              name="aboutInternship"
              value={formData.aboutInternship}
              onChange={handleChange}
              placeholder="Describe the internship role, responsibilities, and what interns will learn"
              rows={4}
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.aboutInternship ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.aboutInternship && <p className="mt-1 text-xs text-red-600">{errors.aboutInternship}</p>}
          </div>

          {/* Row 5: Who Can Apply & Perks */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="whoCanApply" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Users size={16} className="text-red-600" />
                Who Can Apply*
              </label>
              <textarea
                id="whoCanApply"
                name="whoCanApply"
                value={formData.whoCanApply}
                onChange={handleChange}
                placeholder="e.g. 2nd year and above, CSE/IT students"
                rows={3}
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.whoCanApply ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.whoCanApply && <p className="mt-1 text-xs text-red-600">{errors.whoCanApply}</p>}
            </div>

            <div>
              <label htmlFor="perks" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Gift size={16} className="text-pink-600" />
                Perks*
              </label>
              <textarea
                id="perks"
                name="perks"
                value={formData.perks}
                onChange={handleChange}
                placeholder="e.g. Health insurance, Certificate, PPO offer"
                rows={3}
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.perks ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.perks && <p className="mt-1 text-xs text-red-600">{errors.perks}</p>}
            </div>
          </div>

          {/* Row 6: Number of Openings & Stipend */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="numberOfOpenings" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Users size={16} className="text-emerald-600" />
                Number of Openings*
              </label>
              <input
                type="number"
                id="numberOfOpenings"
                name="numberOfOpenings"
                value={formData.numberOfOpenings}
                onChange={handleChange}
                placeholder="e.g. 5"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numberOfOpenings ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.numberOfOpenings && <p className="mt-1 text-xs text-red-600">{errors.numberOfOpenings}</p>}
            </div>

            <div>
              <label htmlFor="stipend" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Gift size={16} className="text-yellow-600" />
                Stipend*
              </label>
              <input
                type="text"
                id="stipend"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="e.g. ₹15,000/month"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.stipend ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.stipend && <p className="mt-1 text-xs text-red-600">{errors.stipend}</p>}
            </div>
          </div>

          {/* Row 7: Start Date & Additional Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Calendar size={16} className="text-blue-600" />
                Start Date*
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startDate ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="additionalInfo" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Info size={16} className="text-slate-600" />
                Additional Information*
              </label>
              <input
                type="text"
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="e.g. Duration, travel allowance, etc"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.additionalInfo ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.additionalInfo && <p className="mt-1 text-xs text-red-600">{errors.additionalInfo}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              {submitting ? 'Posting...' : 'Post Internship'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
