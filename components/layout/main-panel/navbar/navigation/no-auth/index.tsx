"use client"

import { AuthForm } from "@/components/forms/auth"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { useScopedI18n } from "@/locales/client"
import { UserGeneric } from "@/types/entities/user"
import { Button } from "@/ui/button"

export const NavbarNavigationNoAuth = ({
  user
}: {
  user: UserGeneric
}) => {
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
    <Button
      filter="blurred"
      variant="action"
      rounded="full"
      className="text-black"
      onClick={handleAuth}
    >
      {navbarLocale('log-in')}
    </Button>
  )
}