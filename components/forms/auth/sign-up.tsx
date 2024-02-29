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
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { signUpSchema } from "@/lib/schemas/auth/sign-up";
import { useToast } from "@/lib/hooks/ui/use-toast";

export const SignUpForm = () => {
  const { closeDialog } = useDialog()
  const { toast } = useToast();
  const router = useRouter()
  const supabase = createClient()

  // const authModalLocale = useScopedI18n('main-service.main-part.config.modal')

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const { data: userData, error: userErr } = await supabase.auth.signUp({
        options: {
          data: {
            first_name: values.first_name,
            last_name: values.last_name,
          }
        },
        email: values.email,
        password: values.password,
      })

      if (userErr) {
        toast({
          title: userErr.message
        })
      } else {
        closeDialog();
        router.refresh()
      }
    } catch (error) {
      toast({
        title: String(error)
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[440px] space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Имя
              </FormLabel>
              <FormControl>
                <Input
                  autoCorrect="false"
                  autoComplete="false"
                  spellCheck="false"
                  placeholder="Имя"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Фамилия
              </FormLabel>
              <FormControl>
                <Input
                  autoCorrect="false"
                  autoComplete="false"
                  spellCheck="false"
                  placeholder="Фамилия"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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