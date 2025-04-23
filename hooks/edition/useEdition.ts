import { fetchEdition } from "@/hooks/edition/fetch";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch detailed information about a specific edition by ID
 *
 * @param editionId The ID of the edition to fetch (with or without "/books/" prefix)
 * @returns Query result containing the edition details
 */
export const useEdition = (editionId: string | undefined) => {
	return useQuery({
		queryKey: ["editionDetails", editionId],
		queryFn: () => {
			if (!editionId) {
				throw new Error("Edition ID is required");
			}
			return fetchEdition(editionId);
		},
		enabled: !!editionId,
		staleTime: 30 * 60 * 1000, // 30 minutes
	});
};
