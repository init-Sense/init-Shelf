import { z } from "zod";

export const WorkAuthorSchema = z.object({
	author: z.object({
		key: z.string(),
	}),
	type: z
		.object({
			key: z.string(),
		})
		.optional(),
});

export const WorkSchema = z.object({
	key: z.string(),
	title: z.string(),
	description: z
		.union([
			z.string(),
			z.object({ type: z.string().optional(), value: z.string() }),
		])
		.optional()
		.nullable(),
	covers: z.array(z.number()).optional().nullable(),
	subjects: z.array(z.string()).optional().nullable(),
	subject_places: z.array(z.string()).optional().nullable(),
	subject_times: z.array(z.string()).optional().nullable(),
	subject_people: z.array(z.string()).optional().nullable(),
	authors: z.array(WorkAuthorSchema).optional().nullable(),
	first_publish_date: z.string().optional().nullable(),
	type: z
		.object({
			key: z.string(),
		})
		.optional(),
	latest_revision: z.number().optional(),
	revision: z.number().optional(),
	created: z
		.object({
			type: z.string().optional(),
			value: z.string().optional(),
		})
		.optional(),
	last_modified: z
		.object({
			type: z.string().optional(),
			value: z.string().optional(),
		})
		.optional(),
	excerpts: z.array(z.any()).optional().nullable(),
	links: z.array(z.any()).optional().nullable(),
	notes: z.any().optional().nullable(),
	subtitle: z.string().optional().nullable(),
});

export type Work = z.infer<typeof WorkSchema>;
