import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { sitePages, type SitePageContent } from '@/lib/site-content';

type PageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(sitePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const page = sitePages[slug];
  
  if (!page) {
    return { title: 'Page Not Found' };
  }
  
  return {
    title: `${page.title} | InternArea`,
    description: page.description,
  };
}

function FeatureCard({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function MilestoneItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {year.slice(-2)}
        </div>
        <div className="mt-2 h-full w-px bg-gray-200" />
      </div>
      <div className="pb-8">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function TeamMember({ name, role, bio, image }: { name: string; role: string; bio: string; image: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <img src={image} alt={name} className="h-24 w-24 rounded-full object-cover" />
      <h4 className="mt-4 text-lg font-semibold text-gray-900">{name}</h4>
      <p className="text-sm font-medium text-blue-600">{role}</p>
      <p className="mt-2 text-sm text-gray-600">{bio}</p>
    </div>
  );
}

function NewsItem({ publication, headline, summary }: { publication: string; headline: string; summary: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wider text-blue-600">{publication}</span>
      <h4 className="mt-2 text-lg font-semibold text-gray-900">{headline}</h4>
      <p className="mt-2 text-sm text-gray-600">{summary}</p>
    </div>
  );
}

export default async function DynamicPage({ params }: PageParams) {
  const { slug } = await params;
  const page = sitePages[slug];
  
  if (!page) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{page.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">{page.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">{page.description}</p>
          </div>
          
          {page.highlights && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {page.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Content Sections */}
      {page.sections && page.sections.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {page.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Vision Section */}
      {page.vision && page.vision.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.vision.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Milestones Section */}
      {page.milestones && page.milestones.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Journey</h2>
            <div className="mt-8">
              {page.milestones.map((milestone) => (
                <MilestoneItem key={milestone.year} {...milestone} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Team Section */}
      {page.team && page.team.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Meet the Team</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.team.map((member) => (
                <TeamMember key={member.name} {...member} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* News Section */}
      {page.news && page.news.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.news.map((item, index) => (
                <NewsItem key={index} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      {page.ctaLabel && page.ctaHref && (
        <section className="bg-blue-600 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Explore our platform and find your next opportunity.
            </p>
            <Link
              href={page.ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-600 transition-colors hover:bg-gray-100"
            >
              {page.ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}