"use client"

import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField } from "@/ui/form"
import { Button } from "@/ui/button";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { signUpSchema } from "@/lib/schemas/auth/sign-up";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useSignIn } from "@/lib/hooks/actions/user/auth/use-auth";
import { FormFieldItem } from "@/ui/form-field";

export const SignUpForm = () => {
  const { closeDialog } = useDialog()
  const { toast } = useToast();
  const { refresh } = useRouter();
  
  const { signUp } = useSignIn();

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
      const response = await signUp(values);

      if (response.error) {
        toast({
          title: response.error.message
        })
      } else {
        closeDialog();
        refresh()
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
            <FormFieldItem
              label="Имя"
              input={{
                placeholder: "Имя",
                name: "first_name",
                autoComplete: false,
                autoCorrect: false
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormFieldItem
              label="Фамилия"
              input={{
                placeholder: "Фамилия",
                name: "last_name",
                autoComplete: false,
                autoCorrect: false
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormFieldItem
              label="Почта"
              input={{
                placeholder: "Email",
                name: "email",
                autoComplete: false,
                autoCorrect: false
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormFieldItem
              label="Пароль"
              input={{
                placeholder: "Password",
                name: "password",
              }}
              {...field}
            />
          )}
        />
        <Button type="submit" rounded="large">
          Войти
        </Button>
      </form>
    </Form>
  );
}