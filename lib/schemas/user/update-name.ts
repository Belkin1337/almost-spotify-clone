import { z } from "zod";

export const updateNameSchema = z.object({
  first_name: z.string().min(1, {
    message: "Поле обязательно!"
  }),
  last_name: z.string().min(1, {
    message: "Поле обязательно!"
  })
})