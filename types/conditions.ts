import { z } from "zod";
import { timestampFields, uuidSchema } from "./schema";

export const conditionSchema = z
	.object({
		id: uuidSchema,
		name: z.string(),
	})
	.merge(timestampFields);

export type Condition = z.infer<typeof conditionSchema>;
export type NewCondition = Omit<Condition, "id" | "created_at" | "updated_at">;
