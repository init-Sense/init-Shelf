import { type Author, AuthorSchema } from "@/types/author";

export const fetchAuthor = async (authorKey: string): Promise<Author> => {
	const cleanKey = authorKey.startsWith("/authors/")
		? authorKey
		: `/authors/${authorKey}`;

	const response = await fetch(`https://openlibrary.org${cleanKey}.json`);

	if (!response.ok) {
		throw new Error(`Failed to fetch author details: ${response.status}`);
	}

	const data = await response.json();
	return AuthorSchema.parse(data);
};
