import { z } from "zod";
import { timestampFields, uuidSchema } from "./schema";

export const formatSchema = z
	.object({
		id: uuidSchema,
		name: z.string(),
	})
	.merge(timestampFields);

export type Format = z.infer<typeof formatSchema>;
export type NewFormat = Omit<Format, "id" | "created_at" | "updated_at">;
