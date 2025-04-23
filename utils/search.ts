import type { SearchParams } from "@/types/search";

export const buildSearchUrl = (params: SearchParams): string => {
	const baseUrl = "https://openlibrary.org/search.json";
	const searchParams = new URLSearchParams();

	if (params.q) searchParams.append("q", params.q);
	if (params.title) searchParams.append("title", params.title);
	if (params.author) searchParams.append("author", params.author);
	if (params.sort) searchParams.append("sort", params.sort);
	if (params.limit) searchParams.append("limit", params.limit.toString());
	if (params.page) searchParams.append("page", params.page.toString());
	if (params.language) searchParams.append("language", params.language);
	if (params.mode) searchParams.append("mode", params.mode);

	const fields =
		params.fields ||
		"key,title,author_name,author_key,cover_i,cover_edition_key,edition_count,first_publish_year,language,lending_edition_s,lending_identifier_s,editions,editions.key,editions.title,editions.author_name,editions.description,editions.language,editions.cover_i,editions.publish_year";

	searchParams.append("fields", fields);

	return `${baseUrl}?${searchParams.toString()}`;
};
