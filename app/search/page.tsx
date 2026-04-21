import SearchPageClient from './SearchPageClient';

type SearchPageProps = {
	searchParams?: Promise<{
		q?: string;
	}>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const resolvedSearchParams = (await searchParams) ?? {};
	const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

	return <SearchPageClient query={query} />;
}