'use client';

import { useState } from 'react';
import { Briefcase, Building2, Calendar, Gift, Info, MapPin, Tag, Users } from 'lucide-react';

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    companyName: '',
    category: '',
    aboutCompany: '',
    aboutJob: '',
    whoCanApply: '',
    perks: '',
    numberOfOpenings: '',
    stipend: '',
    startDate: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      'title',
      'location',
      'companyName',
      'category',
      'aboutCompany',
      'aboutJob',
      'whoCanApply',
      'perks',
      'numberOfOpenings',
      'stipend',
      'startDate',
      'additionalInfo',
    ];

    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (!value.toString().trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Job Form Data:', formData);
    alert('Job posted successfully!');

    setFormData({
      title: '',
      location: '',
      companyName: '',
      category: '',
      aboutCompany: '',
      aboutJob: '',
      whoCanApply: '',
      perks: '',
      numberOfOpenings: '',
      stipend: '',
      startDate: '',
      additionalInfo: '',
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Post New Job</h1>
          <p className="mt-2 text-slate-600">Create a new job opportunity for students</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-8 shadow-md transition">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Briefcase size={16} className="text-blue-600" />
                  Title*
                </span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Software Developer"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-green-600" />
                  Location*
                </span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bengaluru, India"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Building2 size={16} className="text-purple-600" />
                  Company Name*
                </span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
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
              <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Tag size={16} className="text-orange-600" />
                  Category*
                </span>
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Engineering, Marketing"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="aboutCompany" className="mb-2 block text-sm font-semibold text-slate-900">
              <span className="flex items-center gap-2">
                <Building2 size={16} className="text-indigo-600" />
                About Company*
              </span>
            </label>
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              rows={4}
              placeholder="Tell students about your company culture, impact, and mission"
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.aboutCompany ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.aboutCompany && <p className="mt-1 text-xs text-red-600">{errors.aboutCompany}</p>}
          </div>

          <div>
            <label htmlFor="aboutJob" className="mb-2 block text-sm font-semibold text-slate-900">
              <span className="flex items-center gap-2">
                <Briefcase size={16} className="text-cyan-600" />
                About Job*
              </span>
            </label>
            <textarea
              id="aboutJob"
              name="aboutJob"
              value={formData.aboutJob}
              onChange={handleChange}
              rows={4}
              placeholder="Describe role responsibilities, expectations, and growth opportunities"
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.aboutJob ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.aboutJob && <p className="mt-1 text-xs text-red-600">{errors.aboutJob}</p>}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="whoCanApply" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Users size={16} className="text-red-600" />
                  Who Can Apply*
                </span>
              </label>
              <textarea
                id="whoCanApply"
                name="whoCanApply"
                value={formData.whoCanApply}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Final year students with strong DSA and communication"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.whoCanApply ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.whoCanApply && <p className="mt-1 text-xs text-red-600">{errors.whoCanApply}</p>}
            </div>

            <div>
              <label htmlFor="perks" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Gift size={16} className="text-pink-600" />
                  Perks*
                </span>
              </label>
              <textarea
                id="perks"
                name="perks"
                value={formData.perks}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Health insurance, learning budget, cab allowance"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.perks ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.perks && <p className="mt-1 text-xs text-red-600">{errors.perks}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="numberOfOpenings" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Users size={16} className="text-emerald-600" />
                  Number of Openings*
                </span>
              </label>
              <input
                id="numberOfOpenings"
                name="numberOfOpenings"
                type="number"
                value={formData.numberOfOpenings}
                onChange={handleChange}
                placeholder="e.g. 8"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numberOfOpenings ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.numberOfOpenings && <p className="mt-1 text-xs text-red-600">{errors.numberOfOpenings}</p>}
            </div>

            <div>
              <label htmlFor="stipend" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Gift size={16} className="text-yellow-600" />
                  Stipend*
                </span>
              </label>
              <input
                id="stipend"
                name="stipend"
                type="text"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="e.g. CTC ₹10 LPA"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.stipend ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.stipend && <p className="mt-1 text-xs text-red-600">{errors.stipend}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  Start Date*
                </span>
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startDate ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="additionalInfo" className="mb-2 block text-sm font-semibold text-slate-900">
                <span className="flex items-center gap-2">
                  <Info size={16} className="text-slate-600" />
                  Additional Information*
                </span>
              </label>
              <input
                id="additionalInfo"
                name="additionalInfo"
                type="text"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="e.g. Selection process, joining kit, relocation support"
                className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.additionalInfo ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.additionalInfo && <p className="mt-1 text-xs text-red-600">{errors.additionalInfo}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 hover:shadow-md"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
