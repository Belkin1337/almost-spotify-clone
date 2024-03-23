"use client"

import { useRouter } from "next/navigation";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormMessage } from "@/ui/form"
import { Button } from "@/ui/button";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { signUpSchema } from "@/lib/schemas/auth/sign-up";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useSignIn } from "@/lib/hooks/actions/user/auth/use-auth";
import { FormFieldItem } from "@/ui/form-field";
import { ReactElement, useState } from "react";
import { Typography } from "@/ui/typography";
import { FaUserTag } from "react-icons/fa";
import { SignInForm } from "./sign-in";

export const SignUpForm = () => {
  const [error, setError] = useState('');
  const { toast } = useToast();
  const { openDialog, closeDialog } = useDialog()
  const { refresh } = useRouter();

  const handleDialogForm = (element: ReactElement) => {
    openDialog({
      dialogChildren: element
    })
  };

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
        setError(response.error.message);
        return;
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-[440px] space-y-6 p-6 ${error && 'border border-red-500'}`}
      >
        <Typography>
          Регистрация
        </Typography>
        {error && (
          <FormMessage>
            {error}
          </FormMessage>
        )}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormFieldItem
              label="Имя"
              input={{
                placeholder: "Имя",
                name: "first_name",
                autoComplete: 'false',
                autoCorrect: 'false'
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
                optional: true,
                autoComplete: 'false',
                autoCorrect: 'false'
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
                autoComplete: 'false',
                autoCorrect: 'false'
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
        <Button type="submit" variant="form">
          <Typography className="relative z-20">
            Зарегистрироваться
          </Typography>
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div
          onClick={() => handleDialogForm(<SignInForm />)}
          className="flex items-center gap-x-2 cursor-pointer"
        >
          <FaUserTag
            size={18}
            className="text-neutral-400"
          />
          <Typography variant="link">
            Авторизация
          </Typography>
        </div>
      </form>
    </Form>
  );
}