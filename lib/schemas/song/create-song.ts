import { z } from "zod";

// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// const ACCEPTED_SONG_TYPES = ["audio/mp3", "audio/wav"];

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
