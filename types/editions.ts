import { z } from "zod";
import { jsonbArraySchema, timestampFields, uuidSchema } from "./schema";

export const editionSchema = z
	.object({
		id: uuidSchema,
		work_id: uuidSchema,
		isbn_13: z.string().nullable(),
		isbn_10: z.string().nullable(),
		cover_url: z.string().nullable(),
		publishers: jsonbArraySchema,
		page_count: z.number().nullable(),
		edition_year: z.number().nullable(),
		place_of_publication: z.string().nullable(),
		width_mm: z.number().nullable(),
		height_mm: z.number().nullable(),
		depth_mm: z.number().nullable(),
		is_translation: z.boolean().default(false),
		translation_title: z.string().nullable(),
		translation_language_id: uuidSchema.nullable(),
		editors: jsonbArraySchema,
		translators: jsonbArraySchema,
	})
	.merge(timestampFields);

export type Edition = z.infer<typeof editionSchema>;
export type NewEdition = Omit<Edition, "id" | "created_at" | "updated_at">;
