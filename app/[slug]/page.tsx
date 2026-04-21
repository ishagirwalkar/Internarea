import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

import { sitePages } from '@/lib/site-content';

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateStaticParams() {
	return Object.keys(sitePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const content = sitePages[slug];

	if (!content) {
		return {};
	}

	return {
		title: `${content.title} | InternArea`,
		description: content.description,
	};
}

export default async function SiteContentPage({ params }: PageProps) {
	const { slug } = await params;
	const content = sitePages[slug];

	if (!content) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl space-y-10">
				<section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.22),_transparent_28%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] px-6 py-12 text-white sm:px-10">
						<p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">{content.eyebrow}</p>
						<h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{content.title}</h1>
						<p className="mt-4 max-w-2xl text-base leading-7 text-blue-50/90">{content.description}</p>
						<div className="mt-8 flex flex-wrap gap-3">
							{content.highlights.map((highlight) => (
								<span key={highlight} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
									{highlight}
								</span>
							))}
						</div>
					</div>
				</section>

				<section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
					<div className="space-y-6">
						{content.sections.map((section) => (
							<article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
								<h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
								<p className="mt-4 text-sm leading-7 text-slate-600">{section.body}</p>
							</article>
						))}
					</div>

					<aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Next step</p>
						<h2 className="mt-3 text-2xl font-semibold text-slate-900">Keep moving</h2>
						<p className="mt-4 text-sm leading-7 text-slate-600">
							Explore more of InternArea through the next most relevant action for this section.
						</p>
						<Link
							href={content.ctaHref}
							className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
						>
							<span>{content.ctaLabel}</span>
							<ArrowRight size={16} />
						</Link>
					</aside>
				</section>
			</div>
		</main>
	);
}