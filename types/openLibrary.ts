import { z } from "zod";

export const BookSchema = z.object({
	key: z.string(),
	title: z.string(),
	author_name: z.array(z.string()).optional(),
	author_key: z.array(z.string()).optional(),
	cover_i: z.number().optional(),
	cover_edition_key: z.string().optional(),
	edition_count: z.number().optional(),
	first_publish_year: z.number().optional(),
	language: z.array(z.string()).optional(),
	has_fulltext: z.boolean().optional(),
	public_scan_b: z.boolean().optional(),
	ia: z.array(z.string()).optional(),
	ia_collection_s: z.string().optional(),
	lending_edition_s: z.string().optional(),
	lending_identifier_s: z.string().optional(),
});

export const SearchResponseSchema = z.object({
	numFound: z.number(),
	start: z.number(),
	numFoundExact: z.boolean(),
	docs: z.array(BookSchema),
	q: z.string().optional(),
	offset: z.union([z.number(), z.null()]).optional(),
	num_found: z.number().optional(),
	documentation_url: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;

export type SearchParams = {
	q?: string;
	title?: string;
	author?: string;
	sort?: string;
	limit?: number;
	page?: number;
	language?: string;
};
