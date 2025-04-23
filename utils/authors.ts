export const formatAuthors = (authors?: string[]): string => {
	if (!authors || authors.length === 0) return "Unknown author";

	if (authors.length === 1) return authors[0];

	if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;

	return (
		authors.slice(0, 3).join(", ") + (authors.length > 3 ? ", et al." : "")
	);
};
