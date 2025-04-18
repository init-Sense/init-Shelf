import {
	type SearchParams,
	type SearchResponse,
	SearchResponseSchema,
} from "@/types/openLibrary";
import { useQuery } from "@tanstack/react-query";

const buildSearchUrl = (params: SearchParams): string => {
	const baseUrl = "https://openlibrary.org/search.json";
	const searchParams = new URLSearchParams();

	if (params.q) searchParams.append("q", params.q);
	if (params.title) searchParams.append("title", params.title);
	if (params.author) searchParams.append("author", params.author);
	if (params.sort) searchParams.append("sort", params.sort);
	if (params.limit) searchParams.append("limit", params.limit.toString());
	if (params.page) searchParams.append("page", params.page.toString());
	if (params.language) searchParams.append("language", params.language);

	return `${baseUrl}?${searchParams.toString()}`;
};

const fetchBookSearch = async (
	params: SearchParams,
): Promise<SearchResponse> => {
	if (!params.q && !params.title && !params.author) {
		return {
			numFound: 0,
			start: 0,
			numFoundExact: true,
			docs: [],
		};
	}

	const url = buildSearchUrl(params);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Network response was not ok: ${response.status}`);
	}

	const data = await response.json();

	try {
		return SearchResponseSchema.parse(data);
	} catch (error) {
		console.error("Schema validation error:", error);
		throw new Error("Invalid response format from API");
	}
};

export const useBookSearch = (params: SearchParams) => {
	const enabled = !!(params.q || params.title || params.author);

	return useQuery({
		queryKey: ["bookSearch", params],
		queryFn: () => fetchBookSearch(params),
		enabled,
		staleTime: 5 * 60 * 1000,
	});
};
