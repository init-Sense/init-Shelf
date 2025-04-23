import { search } from "@/hooks/search";
import type { SearchParams } from "@/types/search";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (params: SearchParams) => {
	const enabled = !!(params.q || params.title || params.author);

	return useQuery({
		queryKey: ["globalSearch", params],
		queryFn: () => search(params),
		enabled,
		staleTime: 5 * 60 * 1000,
	});
};
