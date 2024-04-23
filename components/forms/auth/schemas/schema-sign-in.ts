import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(2, {
    message: "Некорректная почта",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов"
  })
})