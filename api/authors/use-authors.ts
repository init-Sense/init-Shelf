import type { Author } from "@/types/author";
import { useQuery } from "@tanstack/react-query";

const SEARCH_API_BASE_URL = "https://openlibrary.org/search/authors.json";

export const useAuthors = (query: string) => {
	return useQuery<Author[], Error>({
		queryKey: ["authors", "search", query],
		queryFn: async () => {
			try {
				const encodedQuery = encodeURIComponent(query);

				const response = await fetch(
					`${SEARCH_API_BASE_URL}?q=${encodedQuery}`,
				);

				if (!response.ok) {
					throw new Error(`API call failed with status: ${response.status}`);
				}

				const data = await response.json();
				return data.items || [];
			} catch (error) {
				console.error("Error searching books:", error);
				throw error;
			}
		},
		enabled: query.length > 2,
		staleTime: 1000 * 60 * 5,
	});
};
