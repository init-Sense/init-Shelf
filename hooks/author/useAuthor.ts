import { fetchAuthor } from "@/hooks/author/fetchAuthor";
import { useQuery } from "@tanstack/react-query";

export const useAuthor = (authorKey: string | undefined) => {
	return useQuery({
		queryKey: ["author", authorKey],
		queryFn: () => {
			if (!authorKey) {
				throw new Error("Author key is required");
			}
			return fetchAuthor(authorKey);
		},
		enabled: !!authorKey,
		staleTime: 60 * 60 * 1000,
	});
};
