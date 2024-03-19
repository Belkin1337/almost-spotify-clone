"use client"

import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField } from "@/ui/form"
import { Button } from "@/ui/button";
import { signInSchema } from "@/lib/schemas/auth/sign-in";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { toast } from "@/lib/hooks/ui/use-toast";
import { FormFieldItem } from "@/ui/form-field";
import { useSignIn } from "@/lib/hooks/actions/user/auth/use-auth";

export const SignInForm = () => {
  const { closeDialog } = useDialog()
  const { refresh } = useRouter()
  
  const { signIn } = useSignIn();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await signIn(values);

      if (response.error) {
        toast({
          title: response.error.message
        })
      } else {
        closeDialog();
        refresh();
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
          name="email"
          render={({ field }) => (
            <FormFieldItem
              label="Почта"
              input={{
                placeholder: "Email",
                name: "email"
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
                name: "password"
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