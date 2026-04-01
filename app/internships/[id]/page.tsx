import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import { SAMPLE_INTERNSHIPS, InternshipData } from '@/lib/internships';

function getInternshipById(id: string): InternshipData | undefined {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  return SAMPLE_INTERNSHIPS.find((internship) => internship.id === numericId);
}

export default function InternshipDetailPage({ params }: { params: { id: string } }) {
  const internship = getInternshipById(params.id);

  if (!internship) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/internships"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Internships
          </Link>
          <span className="text-sm font-semibold text-gray-600">
            {internship.openings} Openings
          </span>
        </div>

        <article className="bg-white rounded-xl shadow-md p-6 lg:p-10 space-y-6">
          <header className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                <CheckCircle size={14} /> Actively Hiring
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 border border-gray-200 px-2 py-1 rounded-full">
                Posted {internship.postedDaysAgo}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{internship.title}</h1>
            <p className="text-lg font-semibold text-gray-700">{internship.company}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <MapPin size={16} /> {internship.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={16} /> {internship.startDate}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={16} /> {internship.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <DollarSign size={16} /> {internship.stipend}
              </span>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About Company</h2>
              <p className="text-gray-700 text-sm">{internship.aboutCompany}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About Internship</h2>
              <p className="text-gray-700 text-sm">{internship.aboutInternship}</p>
            </div>
          </section>

          <section className="rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Who can apply</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700 text-sm">
              {internship.whoCanApply.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Perks</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700 text-sm">
              {internship.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-100 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Info</h3>
            <p className="text-gray-700 text-sm">{internship.additionalInfo}</p>
          </section>

          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-blue-800 font-medium">End date and contract details may vary depending on profile and availability.</p>
          </div>

          <div className="mt-1 flex justify-end">
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">
              Apply Now
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
