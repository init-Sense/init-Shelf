import { fetchAuthors } from "@/hooks/author/fetchAuthors";
import { useQuery } from "@tanstack/react-query";

export const useAuthorsDetails = (authorKeys: string[] | undefined) => {
	return useQuery({
		queryKey: ["authors", authorKeys],
		queryFn: () => {
			if (!authorKeys || authorKeys.length === 0) {
				return [];
			}
			return fetchAuthors(authorKeys);
		},
		enabled: !!(authorKeys && authorKeys.length > 0),
		staleTime: 60 * 60 * 1000,
	});
};
