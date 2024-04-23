import { z } from "zod";

export const createAlbumSchema = z.object({
  artists: z.string().array().min(1, {
    message: "Поле обязательно!",
  }),
  songs: z.string().array().min(3, {
    message: "Минимум 3 трека!"
  }).max(16, {
    message: "Максимум 16 треков в альбоме"
  }),
  title: z.string().min(1, {
    message: "Поле обязательно"
  }).max(82, {
    message: "Слишком длинное название альбома!"
  }),
  image: z.any().refine((file) => file, "Обложка обязательна!"),
})