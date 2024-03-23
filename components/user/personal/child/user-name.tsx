"use client"

import { profile_route } from "@/lib/constants/routes"
import { UserGeneric } from "@/types/entities/user"
import { Typography } from "@/ui/typography"
import { VariantProps, cva } from "class-variance-authority"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

const userNameVariants = cva("text-white", {
  variants: {
    variant: {
      profile: "text-6xl font-bold",
      playlist: "text-sm font-medium hover:underline underline-offset-2 cursor-pointer",
    }
  },
  defaultVariants: {
    variant: "playlist"
  }
})

interface UserNameProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof userNameVariants> {
  user: UserGeneric
}

export const UserName = ({
  user,
  variant,
  className
}: UserNameProps) => {
  const { push } = useRouter();

  const handlePush = useCallback(() => {
    if (variant === "playlist") {
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
      {user?.first_name || ""} {user?.last_name || ""}
    </Typography>
  )
}