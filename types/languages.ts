import { z } from "zod";
import { timestampFields, uuidSchema } from "./schema";

export const languageSchema = z
	.object({
		id: uuidSchema,
		name: z.string(),
		code: z.string(),
	})
	.merge(timestampFields);

export type Language = z.infer<typeof languageSchema>;
export type NewLanguage = Omit<Language, "id" | "created_at" | "updated_at">;
