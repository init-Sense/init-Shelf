import {
	type SearchParams,
	type SearchResponse,
	SearchResponseSchema,
} from "@/types/search";
import { buildSearchUrl } from "@/utils/search";

export const search = async (params: SearchParams): Promise<SearchResponse> => {
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
