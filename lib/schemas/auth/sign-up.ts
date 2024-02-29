import { z } from "zod";

export const signUpSchema = z.object({
  first_name: z.string().min(1, {
    message: "Поле обязательно!",
  }),
  last_name: z.string(),
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
