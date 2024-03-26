import { z } from "zod";

export const createArtistSchema = z.object({
  name: z.string().min(1, {
    message: "Поле обязательно"
  }),
  description: z.string().min(1, {
    message: "Минимум 1 символ"
  }).optional(),
  image: z.any(),
  cover_image: z.any().optional()
})