import { z } from "zod";

export const updateNameSchema = z.object({
  fullName: z.string().min(1, {
    message: "Имя должно состоять из минимум чем 1 символов."
  })
})