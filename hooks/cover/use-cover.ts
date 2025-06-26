import {useQuery} from "@tanstack/react-query";

const SEARCH_API_BASE_URL = "https://covers.openlibrary.org/a/olid";

export const useCover = (olid: string) => {
	return useQuery<string, Error>({
		queryKey: ["covers", olid],
		queryFn: async () => {
			try {
				const response = await fetch(`${SEARCH_API_BASE_URL}/${olid}.jpg`);

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
