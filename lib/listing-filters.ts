import type { FiltersSidebarValue } from '@/components/FilterSidebar';

export function getActiveFilterCount(filters: FiltersSidebarValue) {
	return [
		filters.category.trim().length > 0,
		filters.location.trim().length > 0,
		filters.experience.trim().length > 0,
		filters.workFromHome,
		filters.partTime,
		filters.salary < 50,
	].filter(Boolean).length;
}

export function parseCompensationToAnnualLakhs(compensation: string) {
	const normalized = compensation.toLowerCase();
	const matches = [...normalized.matchAll(/\d+(?:\.\d+)?/g)].map((match) => Number(match[0]));

	if (matches.length === 0) {
		return 0;
	}

	const includesMonth = normalized.includes('/month') || normalized.includes('month');
	const includesYear = normalized.includes('/year') || normalized.includes('year');
	const includesLakh = normalized.includes('lpa') || normalized.includes('lakh');

	const values = matches.map((value) => {
		if (includesLakh) {
			return value;
		}

		if (includesMonth) {
			return value >= 1000 ? (value * 12) / 100000 : (value * 12) / 100;
		}

		if (includesYear) {
			return value >= 1000 ? value / 100000 : value;
		}

		if (value >= 100000) {
			return value / 100000;
		}

		if (value >= 1000) {
			return (value * 12) / 100000;
		}

		return value;
	});

	return Math.max(...values);
}