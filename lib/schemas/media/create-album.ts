import { z } from "zod";

export const createAlbumSchema = z.object({
  artist: z.string().min(1, {
    message: "Поле обязательно"
  }),
  title: z.string().min(1, {
    message: "Поле обязательно"
  }),
  image: z.any(),
  genre: z.string().min(1, {
    message: "Поле обязательно"
  }),
  songs: z.any()
})