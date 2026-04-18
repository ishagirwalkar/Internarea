'use client';

import { Funnel } from 'lucide-react';

export type FiltersSidebarValue = {
	category: string;
	location: string;
	experience: string;
	salary: number;
	workFromHome: boolean;
	partTime: boolean;
};

type FiltersSidebarProps = {
	value: FiltersSidebarValue;
	onChange: (value: FiltersSidebarValue) => void;
	onClear: () => void;
};

export default function FiltersSidebar({ value, onChange, onClear }: FiltersSidebarProps) {
	const updateValue = <K extends keyof FiltersSidebarValue>(key: K, nextValue: FiltersSidebarValue[K]) => {
		onChange({
			...value,
			[key]: nextValue,
		});
	};

	return (
		<aside className="w-72 rounded-xl bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-lg lg:w-80">
			<div className="space-y-5">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-2">
						<div className="rounded-lg bg-blue-50 p-2 text-blue-600">
							<Funnel className="h-4 w-4" />
						</div>
						<h2 className="text-lg font-semibold text-slate-900">Filters</h2>
					</div>

					<button
						type="button"
						onClick={onClear}
						className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
					>
						Clear all
					</button>
				</div>

				<div className="space-y-5">
					<div>
						<label htmlFor="filter-category" className="mb-2 block text-sm font-medium text-gray-600">
							Category
						</label>
						<input
							id="filter-category"
							type="text"
							value={value.category}
							onChange={(event) => updateValue('category', event.target.value)}
							placeholder="e.g Marketing Intern"
							className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label htmlFor="filter-location" className="mb-2 block text-sm font-medium text-gray-600">
							Location
						</label>
						<input
							id="filter-location"
							type="text"
							value={value.location}
							onChange={(event) => updateValue('location', event.target.value)}
							placeholder="e.g Mumbai"
							className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label htmlFor="filter-experience" className="mb-2 block text-sm font-medium text-gray-600">
							Experience
						</label>
						<input
							id="filter-experience"
							type="text"
							value={value.experience}
							onChange={(event) => updateValue('experience', event.target.value)}
							placeholder="e.g 0-2 years"
							className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-3">
						<label className="flex items-center gap-2 text-sm text-slate-700">
							<input
								type="checkbox"
								checked={value.workFromHome}
								onChange={(event) => updateValue('workFromHome', event.target.checked)}
								className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-500"
							/>
							<span>Work from home</span>
						</label>

						<label className="flex items-center gap-2 text-sm text-slate-700">
							<input
								type="checkbox"
								checked={value.partTime}
								onChange={(event) => updateValue('partTime', event.target.checked)}
								className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-500"
							/>
							<span>Part-time</span>
						</label>
					</div>

					<div>
						<div className="mb-3 flex items-center justify-between gap-3">
							<label htmlFor="filter-salary" className="text-sm font-medium text-gray-600">
								Annual Salary (₹ in lakhs)
							</label>
							<span className="text-sm font-semibold text-slate-700">₹{value.salary}L</span>
						</div>

						<input
							id="filter-salary"
							type="range"
							min="0"
							max="100"
							value={value.salary}
							onChange={(event) => updateValue('salary', Number(event.target.value))}
							className="h-2 w-full cursor-pointer rounded-lg accent-blue-500 transition-opacity duration-200 hover:opacity-90"
						/>

						<div className="mt-2 flex justify-between text-sm text-gray-500">
							<span>₹0L</span>
							<span>₹50L</span>
							<span>₹100L</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
