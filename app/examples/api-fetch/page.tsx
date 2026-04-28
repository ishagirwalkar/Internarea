'use client';

import { FormEvent, useEffect, useState } from 'react';

type InternshipRecord = {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  category: string;
  stipend: string;
};

type FormState = {
  title: string;
  companyName: string;
  location: string;
  category: string;
  stipend: string;
  startDate: string;
  aboutCompany: string;
  aboutInternship: string;
  whoCanApply: string;
  perks: string;
  numberOfOpenings: string;
  additionalInfo: string;
};

const initialForm: FormState = {
  title: 'Frontend Intern',
  companyName: 'Acme Labs',
  location: 'Remote',
  category: 'Engineering',
  stipend: '15000/month',
  startDate: 'Immediate',
  aboutCompany: 'Acme Labs builds internal tools for growing teams.',
  aboutInternship: 'Work on UI features, bug fixes, and product polish.',
  whoCanApply: 'Students familiar with React, HTML, CSS',
  perks: 'Certificate, Flexible hours',
  numberOfOpenings: '2',
  additionalInfo: 'Portfolio link preferred.',
};

export default function ApiFetchExamplePage() {
  const [items, setItems] = useState<InternshipRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [form, setForm] = useState<FormState>(initialForm);

  const loadInternships = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/internship', { cache: 'no-store' });
      const data = (await response.json()) as InternshipRecord[] | { message?: string };

      if (!response.ok) {
        throw new Error(typeof data === 'object' && data !== null && 'message' in data ? data.message || 'Request failed' : 'Request failed');
      }

      setItems(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to fetch internships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadInternships();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      setStatusMessage('');

      const response = await fetch('/api/internship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as InternshipRecord | { message?: string };

      if (!response.ok) {
        throw new Error(typeof data === 'object' && data !== null && 'message' in data ? data.message || 'Request failed' : 'Request failed');
      }

      setStatusMessage('Created a sample internship through the Next.js API route.');
      setItems((current) => [data as InternshipRecord, ...current]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to create internship');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Next.js + Mongoose</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Frontend fetch example</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            This page uses plain browser fetch calls against same-origin Next.js API routes backed by Mongoose.
            GET loads internships from /api/internship and POST creates a new one.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
            <pre className="overflow-x-auto whitespace-pre-wrap">{`useEffect(() => {
  fetch('/api/internship')
    .then((response) => response.json())
    .then(setItems);
}, []);

await fetch('/api/internship', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});`}</pre>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          {statusMessage ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {statusMessage}
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-xl font-medium text-white">Stored internships</h2>
            <button
              type="button"
              onClick={() => void loadInternships()}
              className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:text-white"
            >
              {loading ? 'Refreshing...' : 'Refresh list'}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {loading ? <p className="text-sm text-slate-400">Loading internships...</p> : null}

            {!loading && items.length === 0 ? (
              <p className="text-sm text-slate-400">No internships yet.</p>
            ) : null}

            {items.map((item) => (
              <article key={item._id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300">{item.companyName}</p>
                  </div>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                    {item.category}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-400">{item.location} • {item.stipend}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Create sample internship</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="title">Title</label>
              <input
                id="title"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="companyName">Company</label>
                <input
                  id="companyName"
                  value={form.companyName}
                  onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="location">Location</label>
                <input
                  id="location"
                  value={form.location}
                  onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="category">Category</label>
                <input
                  id="category"
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="stipend">Stipend</label>
                <input
                  id="stipend"
                  value={form.stipend}
                  onChange={(event) => setForm((current) => ({ ...current, stipend: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="aboutCompany">About company</label>
              <textarea
                id="aboutCompany"
                value={form.aboutCompany}
                onChange={(event) => setForm((current) => ({ ...current, aboutCompany: event.target.value }))}
                className="min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="aboutInternship">About internship</label>
              <textarea
                id="aboutInternship"
                value={form.aboutInternship}
                onChange={(event) => setForm((current) => ({ ...current, aboutInternship: event.target.value }))}
                className="min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="whoCanApply">Who can apply</label>
                <textarea
                  id="whoCanApply"
                  value={form.whoCanApply}
                  onChange={(event) => setForm((current) => ({ ...current, whoCanApply: event.target.value }))}
                  className="min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="perks">Perks</label>
                <textarea
                  id="perks"
                  value={form.perks}
                  onChange={(event) => setForm((current) => ({ ...current, perks: event.target.value }))}
                  className="min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="numberOfOpenings">Openings</label>
                <input
                  id="numberOfOpenings"
                  value={form.numberOfOpenings}
                  onChange={(event) => setForm((current) => ({ ...current, numberOfOpenings: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="startDate">Start date</label>
                <input
                  id="startDate"
                  value={form.startDate}
                  onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="additionalInfo">Additional info</label>
                <input
                  id="additionalInfo"
                  value={form.additionalInfo}
                  onChange={(event) => setForm((current) => ({ ...current, additionalInfo: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            >
              {submitting ? 'Creating...' : 'POST to /api/internship'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}