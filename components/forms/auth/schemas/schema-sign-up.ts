import { z } from "zod";

export const signUpSchema = z.object({
  full_name: z.string().min(1, {
    message: "Имя должно содержать хотя бы 1 символ"
  }),
  email: z
    .string()
    .email({
      message: "Поле обязательно!",
    })
    .min(4, {
      message: "Почта должна состоять минимум из 5 символов!",
    }),
  password: z.string().min(6, {
    message: "Пароль должен состоять минимум из 6 символов!"
  })
});
