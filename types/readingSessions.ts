import { z } from "zod";
import { timestampFields, uuidSchema } from "./schema";

export const readingSessionSchema = z
	.object({
		id: uuidSchema,
		user_book_id: uuidSchema,
		start_date: z.string().nullable(),
		end_date: z.string().nullable(),
		notes: z.string().nullable(),
	})
	.merge(timestampFields);

export type ReadingSession = z.infer<typeof readingSessionSchema>;
export type NewReadingSession = Omit<
	ReadingSession,
	"id" | "created_at" | "updated_at"
>;
