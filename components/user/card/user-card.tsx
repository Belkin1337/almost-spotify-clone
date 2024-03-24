"use client"

import React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { UserAvatar } from "../personal/child/user-avatar"
import { UserGeneric } from "@/types/entities/user"
import { UserName } from "../personal/child/user-name"
import { useUser } from "@/lib/hooks/actions/user/auth/use-user"
import { Typography } from "@/ui/typography"
import { FaCircle } from "react-icons/fa";

const userCardVariants = cva("flex overflow-hidden min-w-[220px] w-fit", {
  variants: {
    variant: {
      miniauture: "items-center justify-start gap-x-1"
    }
  }
})

interface UserCard
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof userCardVariants> {
  followed_length?: number
}

export const UserCard = ({
  variant,
  followed_length,
  className,
  ...props
}: UserCard) => {
  const { user } = useUser();

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
      {variant === "miniauture" && (
        <>
          <FaCircle size={4} className="fill-white" />
          <Typography className="text-sm font-normal">
            {followed_length} songs
          </Typography>
        </>
      )}
    </div>
  )
}