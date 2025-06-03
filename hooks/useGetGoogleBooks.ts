import { type GoogleBook, searchBooks } from "@/lib/api/googleBooks";
import { useQuery } from "@tanstack/react-query";

export const useGetGoogleBooks = (query: string) => {
	return useQuery<GoogleBook[], Error>({
		queryKey: ["books", "search", query],
		queryFn: () => searchBooks(query),
		enabled: query.length > 2,
		staleTime: 1000 * 60 * 5,
	});
};
