import { type Edition, EditionSchema } from "@/types/edition";

export const fetchEdition = async (editionKey: string): Promise<Edition> => {
	const cleanKey = editionKey.startsWith("/books/")
		? editionKey
		: `/books/${editionKey}`;
	const response = await fetch(`https://openlibrary.org${cleanKey}.json`);

	if (!response.ok) {
		throw new Error(`Failed to fetch edition details: ${response.status}`);
	}

	const data = await response.json();
	return EditionSchema.parse(data);
};

export const fetchEditions = async (
	editionKeys: string[],
): Promise<Edition[]> => {
	const editionPromises = editionKeys.map((id) => fetchEdition(id));
	return Promise.all(editionPromises);
};
