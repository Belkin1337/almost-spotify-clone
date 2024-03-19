"use client"

import { VariantProps, cva } from "class-variance-authority"
import React from "react"
import { UserAvatar } from "../personal/child/user-avatar"
import { UserGeneric } from "@/types/entities/user"
import { UserName } from "../personal/child/user-name"
import { useUser } from "@/lib/hooks/actions/user/auth/use-user"
import { Typography } from "@/ui/typography"

const userCardVariants = cva("flex overflow-hidden min-w-[220px] w-fit", {
  variants: {
    variant: {
      miniauture: "items-center justify-start gap-x-2"
    }
  }
})

interface UserCard
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof userCardVariants> {
  // followed_length: number
}

export const UserCard = ({
  variant,
  // followed_length,
  className,
  ...props
}: UserCard) => {
  const { data: user } = useUser();

  return (
    <div className={userCardVariants(({
      variant,
      className
    }))}
      {...props}
    >
      <UserAvatar
        user={user as UserGeneric}
        variant={variant === "miniauture" ? "playlist" : "default"}
      />
      <UserName
        user={user as UserGeneric}
        variant={variant === "miniauture" ? "playlist" : "profile"}
      />
      {/* todo: impl followed songs length */}
      {/* {variant === "miniauture" && <Typography>{followed_length}</Typography>} */}
    </div>
  )
}