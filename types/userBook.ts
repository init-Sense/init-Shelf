import { z } from "zod";

export const userBookSchema = z.object({
	id: z.string().uuid(),
	google_book_id: z.string().optional(),
	user_id: z.string().uuid(),
	cover: z.string().url().optional(),
	title: z.string().min(1),
	authors: z.array(z.string()),
	publisher: z.string().optional(),
	published_date: z.string().optional(),
	language: z.string().optional(),
	translator: z.string().optional(),
	editor: z.string().optional(),
	description: z.string().optional(),
	original_title: z.string().optional(),
	first_published_date: z.string().optional(),
	original_language: z.string().optional(),
	category_id: z.string().uuid().optional(),
	subcategory_id: z.string().uuid().optional(),
	genres: z.array(z.string().uuid()).optional(),
	collections: z.array(z.string().uuid()).optional(),
	isbn_13: z.string().optional(),
	isbn_10: z.string().optional(),
	format: z.string().optional(),
	pages: z.number().int().positive().optional(),
	size: z.string().optional(),
	reading_state: z.string().optional(),
	wishlist: z.boolean().default(false),
	price: z.string().optional(),
	condition: z.string().optional(),
	acquisition_date: z.string().optional(),
	store: z.string().optional(),
	location: z.string().optional(),
	notes: z.string().optional(),
	created_at: z.string().datetime().optional(),
	updated_at: z.string().datetime().optional(),
});

export type UserBook = z.infer<typeof userBookSchema>;

export const createUserBookSchema = userBookSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export type CreateUserBook = z.infer<typeof createUserBookSchema>;
