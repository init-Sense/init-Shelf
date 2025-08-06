import type { Work } from "@/types/work";
import { useQuery } from "@tanstack/react-query";

const SEARCH_API_BASE_URL = "https://openlibrary.org/works";

export const useWork = (id: string) => {
	return useQuery<Work[], Error>({
		queryKey: ["work", id],
		queryFn: async () => {
			try {
				const response = await fetch(`${SEARCH_API_BASE_URL}/${id}`);

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
		enabled: id.length > 2,
		staleTime: 1000 * 60 * 5,
	});
};
