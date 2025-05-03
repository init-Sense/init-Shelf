import { z } from "zod";
import { jsonbArraySchema, timestampFields, uuidSchema } from "./schema";

export const workSchema = z
	.object({
		id: uuidSchema,
		original_title: z.string(),
		original_publication_year: z.number().nullable(),
		original_language_id: uuidSchema.nullable(),
		authors: jsonbArraySchema,
	})
	.merge(timestampFields);

export type Work = z.infer<typeof workSchema>;
export type NewWork = Omit<Work, "id" | "created_at" | "updated_at">;
