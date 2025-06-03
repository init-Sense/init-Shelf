import { z } from "zod";

export const UserSettingTypeEnum = z.enum([
	"category",
	"subcategory",
	"genre",
	"collection",
]);

export type UserSettingType = z.infer<typeof UserSettingTypeEnum>;

export const userSettingsSchema = z.object({
	id: z.string().uuid(),
	user_id: z.string().uuid(),
	type: UserSettingTypeEnum,
	name: z.string().min(1),
	created_at: z.string().datetime().optional(),
	updated_at: z.string().datetime().optional(),
});

export type UserSetting = z.infer<typeof userSettingsSchema>;

export const createUserSettingsSchema = userSettingsSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export type CreateUserSettings = z.infer<typeof createUserSettingsSchema>;
