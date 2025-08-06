import type { Edition } from "@/types/edition";
import { useQuery } from "@tanstack/react-query";

const SEARCH_API_BASE_URL = "https://openlibrary.org/isbn";

export const useIsbn = (isbn: string) => {
	return useQuery<Edition, Error>({
		queryKey: ["isbn", isbn],
		queryFn: async () => {
			try {
				const response = await fetch(`${SEARCH_API_BASE_URL}/${isbn}`);

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
		enabled: isbn.length > 2,
		staleTime: 1000 * 60 * 5,
	});
};
