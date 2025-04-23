import { z } from "zod";

const LinkSchema = z.object({
	title: z.string(),
	url: z.string(),
	type: z
		.object({
			key: z.string(),
		})
		.optional(),
});

const RemoteIdsSchema = z.record(z.string(), z.string());

const DateObjectSchema = z.object({
	type: z.string().optional(),
	value: z.string(),
});

export const AuthorSchema = z.object({
	key: z.string(),
	name: z.string().optional(),
	personal_name: z.string().optional(),
	birth_date: z.string().optional(),
	death_date: z.string().optional(),
	photos: z.array(z.number()).optional().nullable(),

	bio: z.string().optional(),
	type: z
		.object({
			key: z.string(),
		})
		.optional(),
	alternate_names: z.array(z.string()).optional().nullable(),
	remote_ids: RemoteIdsSchema.optional(),
	source_records: z.array(z.string()).optional().nullable(),
	links: z.array(LinkSchema).optional().nullable(),
	latest_revision: z.number().optional(),
	revision: z.number().optional(),
	created: DateObjectSchema.optional(),
	last_modified: DateObjectSchema.optional(),
});

export type Author = z.infer<typeof AuthorSchema>;
