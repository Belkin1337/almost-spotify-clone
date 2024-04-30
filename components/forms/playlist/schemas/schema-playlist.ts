import { z } from "zod";

export const updatePlaylistSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	image: z.any().optional()
})