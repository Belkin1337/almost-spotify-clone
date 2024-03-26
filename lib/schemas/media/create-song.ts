import { z } from "zod";

export const createSongSchema = z.object({
  artists: z.any(),
  title: z.string().min(1, {
    message: "Поле обязательно",
  }),
  song: z.any(),
  image: z.any(),
  album: z.number().optional(),
  genre: z.string().min(1, {
    message: "Поле обязательно"
  })
}).required()
