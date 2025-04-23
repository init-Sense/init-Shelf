import { fetchAuthor } from "@/hooks/author/fetchAuthor";
import type { Author } from "@/types/author";

export const fetchAuthors = async (authorKeys: string[]): Promise<Author[]> => {
	const uniqueKeys = Array.from(new Set(authorKeys));

	const authorPromises = uniqueKeys.map((key) => fetchAuthor(key));
	return Promise.all(authorPromises);
};
