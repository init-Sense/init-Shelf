import type { Edition } from "@/types/edition";
import type { Work } from "@/types/work";

export const extractMatchingEditions = (
	searchResults: any,
	searchQuery: string,
): string[] => {
	if (!searchQuery || !searchResults?.docs) return [];

	const editionIds: string[] = [];

	searchResults.docs.map((work: Work) => {
		if (work.editions?.docs) {
			const workMatchingEditions = work.editions.docs.filter(
				(edition: Edition) =>
					edition.title.toLowerCase().includes(searchQuery.toLowerCase()),
			);

			if (workMatchingEditions.length > 0) {
				workMatchingEditions.map((edition: Edition) => {
					if (edition.key) {
						editionIds.push(edition.key);
					}
				});
			}
		}
	});

	return editionIds;
};
