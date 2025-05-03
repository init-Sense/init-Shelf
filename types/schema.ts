import { z } from "zod";

export const timestampFields = z.object({
	created_at: z.string().datetime().nullable(),
	updated_at: z.string().datetime().nullable(),
});

export const uuidSchema = z.string().uuid();

export const jsonbArraySchema = z.array(z.string()).default([]);
