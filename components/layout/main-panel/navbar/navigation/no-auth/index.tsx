"use client"

import { AuthForm } from "@/components/forms/auth"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { useScopedI18n } from "@/locales/client"
import { UserGeneric } from "@/types/entities/user"
import { Button } from "@/ui/button"
import { Typography } from "@/ui/typography"

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
        dialogChildren: <AuthForm />
      })
    }
  }

  return (
    <Button
      filter="blurred"
      variant="form"
      rounded="full"
      onClick={handleAuth}
    >
      <Typography>
        {navbarLocale('log-in')}
      </Typography>
    </Button>
  )
}