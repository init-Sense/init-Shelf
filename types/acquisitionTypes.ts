import { z } from "zod";
import { timestampFields, uuidSchema } from "./schema";

export const acquisitionTypeSchema = z
	.object({
		id: uuidSchema,
		name: z.string(),
	})
	.merge(timestampFields);

export type AcquisitionType = z.infer<typeof acquisitionTypeSchema>;
export type NewAcquisitionType = Omit<
	AcquisitionType,
	"id" | "created_at" | "updated_at"
>;
