"use client"

import { AuthForm } from "@/components/forms/auth"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { useScopedI18n } from "@/locales/client"
import { UserGeneric } from "@/types/user"
import { Button } from "@/ui/button"

export const NavbarNavigationNoAuth = ({ user }: { user: UserGeneric }) => {
  const { openDialog } = useDialog();
  const navbarLocale = useScopedI18n('main-service.main-part.config')

  const handleAuth = () => {
    if (!user) {
      openDialog({
        title: "Войдите в аккаунт",
        dialogChildren: <AuthForm />
      })
    }
  }

  return (
    <>
      <Button filter="blurred" rounded="large" onClick={handleAuth} className="bg-transparent text-neutral-300 font-medium">
        {navbarLocale('sign-up')}
      </Button>
      <Button filter="blurred" rounded="large" onClick={handleAuth} className="bg-white px-6 py-2 text-black font-medium">
        {navbarLocale('log-in')}
      </Button>
    </>
  )
}