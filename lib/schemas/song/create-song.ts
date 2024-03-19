import { z } from "zod";

export const createSongSchema = z.object({
  author: z.string().min(1, {
    message: "Поле обязательно",
  }),
  title: z.string().min(1, {
    message: "Поле обязательно",
  }),
  song: z.any(),
  image: z.any(),
  album: z.string().optional(),
  genre: z.string().min(1, {
    message: "Поле обязательно"
  })
}).required()
