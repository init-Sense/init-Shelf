import { WorkSchema } from "@/types/work";
import { z } from "zod";

export const SearchResponseSchema = z.object({
	numFound: z.number(),
	start: z.number(),
	numFoundExact: z.boolean(),
	docs: z.array(WorkSchema),
	q: z.string().optional(),
	offset: z.union([z.number(), z.null()]).optional(),
	num_found: z.number().optional(),
	documentation_url: z.string().optional(),
});

export type SearchParams = {
	q?: string;
	title?: string;
	author?: string;
	sort?: string;
	limit?: number;
	page?: number;
	language?: string;
	fields?: string;
	mode?: "everything" | "ebooks";
};

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
