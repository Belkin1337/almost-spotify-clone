"use client"

import { profile_route } from "@/lib/constants/routes/routes"
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation"
import { MouseEvent, useCallback } from "react"
import { IUserName, userNameVariants } from "@/components/user/components/child/user-name/types/user-name-types";

export const UserName = ({
  user,
  variant,
  className
}: IUserName) => {
  const { push } = useRouter();

  const handlePush = useCallback((e: MouseEvent<HTMLParagraphElement>) => {
    if (variant === "playlist") {
      e.stopPropagation();
      push(`${profile_route}/${user?.id}`)
    }
  }, [push, user?.id, variant])

  return (
    <Typography
      onClick={handlePush}
      className={userNameVariants(({
        variant,
        className
      }))}
    >
      {user?.full_name || ""}
    </Typography>
  )
}