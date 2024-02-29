"use client"

import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useScopedI18n } from "@/locales/client";
import { createClient } from "@/lib/utils/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { signInSchema } from "@/lib/schemas/auth/sign-in";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { toast } from "@/lib/hooks/ui/use-toast";

// const labelSignUp = {
//   nickname: "Имя",
//   email: "Почта",
//   password: "Пароль",
//   submit: "Зарегистрироваться"
// }

// const labelSignIn = {
//   email: "Почта",
//   password: "Пароль",
//   submit: "Войти"
// }

export const SignInForm = () => {
  const { closeDialog } = useDialog()
  const router = useRouter()
  const supabase = createClient()

  const authModalLocale = useScopedI18n('main-service.main-part.config.modal')

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        toast({
          title: error.message
        })
      } else {
        closeDialog();
        router.refresh()
      }
    } catch (error) {
      throw new Error("Something wrong error.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[440px] space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Почта
              </FormLabel>
              <FormControl>
                <Input
                  autoCorrect="false"
                  autoComplete="false"
                  spellCheck="false"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              { }
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Пароль
              </FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-white bg-neutral-950/80 border border-neutral-900"
          rounded="large"
        >
          Войти
        </Button>
      </form>
    </Form>
  );
}