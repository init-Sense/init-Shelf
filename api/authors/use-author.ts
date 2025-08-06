import type { Author } from "@/types/author";
import { useQuery } from "@tanstack/react-query";

const SEARCH_API_BASE_URL = "https://openlibrary.org/authors";

export const useAuthors = (id: string) => {
	return useQuery<Author, Error>({
		queryKey: ["author", "search", id],
		queryFn: async () => {
			try {
				const response = await fetch(`${SEARCH_API_BASE_URL}/${id}.json`);

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
