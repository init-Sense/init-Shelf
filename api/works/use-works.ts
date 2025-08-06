import type { Work } from "@/types/work";
import { useQuery } from "@tanstack/react-query";

const SEARCH_API_BASE_URL = "https://openlibrary.org/search.json";

export const useWorks = (query: string) => {
	return useQuery<Work[], Error>({
		queryKey: ["works", "search", query],
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
