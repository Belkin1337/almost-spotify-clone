"use client"

import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormMessage } from "@/ui/form"
import { Button } from "@/ui/button";
import { signInSchema } from "@/lib/schemas/auth/sign-in";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { toast } from "@/lib/hooks/ui/use-toast";
import { FormFieldItem } from "@/ui/form-field";
import { useSignIn } from "@/lib/hooks/actions/user/auth/use-auth";
import { Typography } from "@/ui/typography";
import { ReactElement, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { SignUpForm } from "./sign-up";

export const SignInForm = () => {
  const [error, setError] = useState('');
  const { openDialog, closeDialog } = useDialog()
  const { refresh } = useRouter()

  const handleDialogForm = (element: ReactElement) => {
    openDialog({
      dialogChildren: element
    })
  };

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
        setError(response.error.message);
        return;
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-[440px] space-y-6 p-6 ${error && 'border border-red-500'}`}
      >
        <Typography>
          Авторизация
        </Typography>
        {error && (
          <FormMessage>
            {error}
          </FormMessage>
        )}
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
        <Button type="submit" variant="form">
          <Typography className="relative z-20">
            Войти
          </Typography>
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div
          onClick={() => handleDialogForm(<SignUpForm />)}
          className="flex items-center gap-x-2 cursor-pointer"
        >
          <FiUserPlus
            size={18}
            className="text-neutral-400"
          />
          <Typography variant="link">
            Регистрация
          </Typography>
        </div>
      </form>
    </Form>
  );
}