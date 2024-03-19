"use client"

import { Button } from "@/ui/button"
import { SignInForm } from "./sign-in"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { SignUpForm } from "./sign-up"

export const AuthForm = () => {
  const { openDialog } = useDialog()

  const handleSignInForm = () => {
    openDialog({
      title: "Авторизация",
      dialogChildren: <SignInForm />
    })
  }

  const handleSignUpForm = () => {
    openDialog({
      title: "Регистрация",
      dialogChildren: <SignUpForm />
    })
  }

  return (
    <div className="flex flex-col gap-y-4 py-6 w-[400px] h-fit">
      <Button onClick={handleSignInForm} className="w-full h-min bg-jade-600" rounded="medium">
        <p className="text-white font-semibold">
          Уже есть аккаунт / Вход
        </p>
      </Button>
      <Button onClick={handleSignUpForm} className="w-full h-min bg-white" rounded="medium">
        <p className="text-neutral-900 font-semibold">
          Нет аккаунта / Регистрация
        </p>
      </Button>
    </div>
  )
}