import { z } from "zod";

export const userReadingSessionSchema = z.object({
	id: z.string().uuid(),
	user_book_id: z.string().uuid(),
	start_date: z.string().datetime().optional(),
	end_date: z.string().datetime().optional(),
	created_at: z.string().datetime().optional(),
	updated_at: z.string().datetime().optional(),
});

export type UserReadingSession = z.infer<typeof userReadingSessionSchema>;

export const createUserReadingSessionSchema = userReadingSessionSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export type CreateUserReadingSession = z.infer<
	typeof createUserReadingSessionSchema
>;
