import { z } from "zod";

export const createAlbumSchema = z.object({
  artists: z.string().min(1, {
    message: "Поле обязательно!",
  }).array(),
  title: z.string().min(1, {
    message: "Поле обязательно"
  }),
  image: z.any(),
  genre: z.string().min(1, {
    message: "Поле обязательно"
  }),
  songs: z.string().min(1, {
    message: "Минимум 2 трека!"
  }).array()
})