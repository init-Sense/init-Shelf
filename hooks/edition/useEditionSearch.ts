import { fetchEditions } from "@/hooks/edition/fetch";
import type { SearchParams } from "@/types/search";
import { extractMatchingEditions } from "@/utils/editions";
import { buildSearchUrl } from "@/utils/search";
import { useQuery } from "@tanstack/react-query";

export const useEditionSearch = (params: SearchParams) => {
	const searchQuery = useQuery({
		queryKey: ["editionSearch", params],
		queryFn: async () => {
			if (!params.q && !params.title && !params.author) {
				return { numFound: 0, docs: [], editionIds: [] };
			}

			const url = buildSearchUrl(params);
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status}`);
			}

			const data = await response.json();
			const editionIds = extractMatchingEditions(data, params.q || "");

			return {
				...data,
				editionIds,
			};
		},
		enabled: !!(params.q || params.title || params.author),
	});

	const editionQueries = useQuery({
		queryKey: ["editionDetails", searchQuery.data?.editionIds],
		queryFn: async () => {
			if (
				!searchQuery.data?.editionIds ||
				searchQuery.data.editionIds.length === 0
			) {
				return [];
			}

			return fetchEditions(searchQuery.data.editionIds);
		},
		enabled: !!(
			searchQuery.data?.editionIds && searchQuery.data.editionIds.length > 0
		),
	});

	const authorKeys =
		editionQueries.data?.flatMap(
			(edition) => edition.authors?.map((author) => author.key) || [],
		) || [];

	return {
		originalResults: searchQuery.data,
		editions: editionQueries.data || [],
		authorKeys: authorKeys.length > 0 ? Array.from(new Set(authorKeys)) : [],
		isSearching: searchQuery.isLoading,
		isFetchingEditions: editionQueries.isLoading,
		isLoading: searchQuery.isLoading || editionQueries.isLoading,
		isError: searchQuery.isError || editionQueries.isError,
		error: searchQuery.error || editionQueries.error,
		numMatchingEditions: editionQueries.data?.length || 0,
	};
};
