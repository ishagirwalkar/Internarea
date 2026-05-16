import Link from 'next/link';
import { Clock, IndianRupee, MapPin } from 'lucide-react';

type JobCardProps = {
	id: string;
	title: string;
	company: string;
	location: string;
	compensation: string;
	duration: string;
};

export default function JobCard({
	id,
	title,
	company,
	location,
	compensation,
	duration,
}: JobCardProps) {
	const detailHref = id.startsWith('/') ? id : `/jobs/${id}`;

	return (
		<Link href={detailHref}>
			<article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
				<div className="mb-5">
					<span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
						Actively Hiring
					</span>
				</div>

				<div className="flex-1 space-y-5">
					<div>
						<h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">{title}</h2>
						<p className="mt-2 text-sm font-medium text-slate-500">{company}</p>
					</div>

					<div className="space-y-3 text-sm text-slate-600">
						<div className="flex items-center gap-3">
							<MapPin className="h-4 w-4 flex-shrink-0 text-sky-600" />
							<span>{location}</span>
						</div>

						<div className="flex items-center gap-3">
							<IndianRupee className="h-4 w-4 flex-shrink-0 text-emerald-600" />
							<span>{compensation}</span>
						</div>

						<div className="flex items-center gap-3">
							<Clock className="h-4 w-4 flex-shrink-0 text-amber-600" />
							<span>{duration}</span>
						</div>
					</div>
				</div>

				<div className="mt-8 inline-flex w-full items-center justify-center rounded-lg border border-sky-200 px-4 py-3 text-sm font-semibold text-sky-700 bg-white transition-colors duration-300 group-hover:border-sky-500 group-hover:bg-blue-50">
					View Details
				</div>
			</article>
		</Link>
	);
}
