import { z } from "zod";

export const EditionSchema = z.object({
	key: z.string(),
	title: z.string(),
	publishers: z.array(z.string()).optional(),
	publish_date: z.string().optional(),
	isbn_13: z.array(z.string()).optional(),
	isbn_10: z.array(z.string()).optional(),
	covers: z.array(z.number()).optional(),
	physical_format: z.string().optional(),
	languages: z
		.array(
			z.object({
				key: z.string(),
			}),
		)
		.optional(),
	authors: z
		.array(
			z.object({
				key: z.string(),
			}),
		)
		.optional(),
	works: z
		.array(
			z.object({
				key: z.string(),
			}),
		)
		.optional(),
});

export type Edition = z.infer<typeof EditionSchema>;
