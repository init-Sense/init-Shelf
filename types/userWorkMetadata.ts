import { z } from "zod";
import { jsonbArraySchema, timestampFields, uuidSchema } from "./schema";

export const userWorkMetadataSchema = z
	.object({
		id: uuidSchema,
		user_id: uuidSchema,
		work_id: uuidSchema,
		categories: jsonbArraySchema,
		subcategories: jsonbArraySchema,
		genres: jsonbArraySchema,
	})
	.merge(timestampFields);

export type UserWorkMetadata = z.infer<typeof userWorkMetadataSchema>;
export type NewUserWorkMetadata = Omit<
	UserWorkMetadata,
	"id" | "created_at" | "updated_at"
>;
