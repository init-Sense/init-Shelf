import { z } from "zod";
import { timestampFields, uuidSchema } from "./schema";

export const acquisitionSchema = z
	.object({
		id: uuidSchema,
		user_book_id: uuidSchema,
		acquisition_type_id: uuidSchema.nullable(),
		cost: z.number().nullable(),
		location: z.string().nullable(),
		store: z.string().nullable(),
		from_whom: z.string().nullable(),
	})
	.merge(timestampFields);

export type Acquisition = z.infer<typeof acquisitionSchema>;
export type NewAcquisition = Omit<
	Acquisition,
	"id" | "created_at" | "updated_at"
>;
