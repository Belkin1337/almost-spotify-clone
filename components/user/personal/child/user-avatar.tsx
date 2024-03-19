"use client"

import React, { useEffect, useState } from "react"
import { useLoadUserAvatar } from "@/lib/hooks/actions/user/preferences/use-load-user-avatar"
import { VariantProps, cva } from "class-variance-authority"
import { UserGeneric } from "@/types/entities/user"
import { Skeleton } from "@/ui/skeleton"
import Image from "next/image"

const userAvatarVariants = cva("rounded-full", {
  variants: {
    variant: {
      default: "h-full w-full object-cover",
      navbar: "h-[34px] w-[34px]",
      playlist: "h-[24px] w-[24px]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface UserAvatarGeneric
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof userAvatarVariants> {
  user: UserGeneric
}

export const UserAvatar = ({
  user,
  variant,
  className
}: UserAvatarGeneric) => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  
  const { data, isLoading } = useLoadUserAvatar(user?.id)

  useEffect(() => {
    setAvatar(data || '/images/null-avatar.png');
  }, [data])

  if (isLoading) {
    return (
      <Skeleton className={`rounded-full
        ${variant === "default" && "h-full w-full"}
        ${variant === "navbar" && "h-[34px] w-[34px]"}
        ${variant === "playlist" && "h-[24px] w-[24px]"}
      `} />
    )
  }

  return (
    <Image
      src={avatar!}
      width={600}
      height={600}
      alt={user?.first_name || ""}
      className={userAvatarVariants(({ 
        variant, 
        className 
      }))}
    />
  )
}