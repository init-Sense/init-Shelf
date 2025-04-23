import { fetchWorkById } from "@/hooks/work/fetchWork";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch and use work details
 *
 * @param workId Work ID (with or without /works/ prefix)
 */
export const useWork = (workId: string | undefined) => {
	return useQuery({
		queryKey: ["work", workId],
		queryFn: () => {
			if (!workId) {
				throw new Error("Work ID is required");
			}
			return fetchWorkById(workId);
		},
		enabled: !!workId,
		staleTime: 30 * 60 * 1000, // 30 minutes
		retry: 2,
	});
};
