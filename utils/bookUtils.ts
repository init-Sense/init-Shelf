export const getBookCoverUrl = (
	coverId?: number,
	size: "S" | "M" | "L" = "M",
): string => {
	if (!coverId) {
		const width = size === "S" ? 100 : size === "M" ? 180 : 300;
		const height = size === "S" ? 150 : size === "M" ? 270 : 450;
		return `https://placehold.co/${width}x${height}/e0e0e0/a0a0a0?text=No+Cover`;
	}

	return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const formatAuthors = (authors?: string[]): string => {
	if (!authors || authors.length === 0) return "Unknown author";

	if (authors.length === 1) return authors[0];

	if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;

	return (
		authors.slice(0, 3).join(", ") + (authors.length > 3 ? ", et al." : "")
	);
};
