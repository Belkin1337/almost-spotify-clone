import { z } from "zod";

export const songSchema = z.object({
  artists: z.string().array().min(1, {
    message: "Поле обязательно!",
  }).max(5, {
    message: "Максимум 5 артистов!"
  }),
  title: z.string().min(1, {
    message: "Поле обязательно!",
  }).max(82, {
    message: "Слишком длинное название трека!"
  }),
  lyrics: z.string().min(1, {
    message: "Минимум 12 символов!"
  }).optional(),
  credits: z.string().array().optional(),
  single: z.boolean().default(false).optional(),
  song: z.any().refine((file) => file, "Файл трека обязателен!"),
  image: z.any().refine((file) => file, "Обложка обязательна!"),
  genre: z.string().min(1, { message: "Поле обязательно!" })
});