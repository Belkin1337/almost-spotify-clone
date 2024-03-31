import { SONG_TYPE_ALBUM, SONG_TYPE_SINGLE } from "@/lib/constants/preview";
import { z } from "zod";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const editSongSchema = z.object({
  artists: z.string().min(1, {
    message: "Поле обязательно!",
  }).array(),
  title: z.string().min(1, {
    message: "Поле обязательно!",
  }),
  image: z.any().refine((file) => file, "Обложка обязательна!").optional(),
  // .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE,
  //   "Максимальный размер файла должен быть не больше 5 MB")
  // .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
  //   "Принимаются только файлы типа .jpg, .jpeg, .png или .webp"
  // ),
  album: z.string().optional(),
  genre: z.string().min(1, {
    message: "Поле обязательно!",
  }),
  type: z.union([z.literal(SONG_TYPE_SINGLE), z.literal(SONG_TYPE_ALBUM)]),
});