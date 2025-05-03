import { z } from "zod";
import { jsonbArraySchema, timestampFields, uuidSchema } from "./schema";

export const userBookSchema = z
	.object({
		id: uuidSchema,
		user_id: uuidSchema,
		edition_id: uuidSchema,
		format_id: uuidSchema.nullable(),
		condition_id: uuidSchema.nullable(),
		acquisition_date: z.string().nullable(),
		acquisition_type_id: uuidSchema.nullable(),
		print_edition: z.string().nullable(),
		user_notes: z.string().nullable(),
		collection_tags: jsonbArraySchema,
		is_owned: z.boolean().default(true),
		is_read: z.boolean().default(false),
		in_wishlist: z.boolean().default(false),
		currently_reading: z.boolean().default(false),
	})
	.merge(timestampFields);

export type UserBook = z.infer<typeof userBookSchema>;
export type NewUserBook = Omit<UserBook, "id" | "created_at" | "updated_at">;
