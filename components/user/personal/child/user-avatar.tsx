"use client"

import React, { useEffect, useState } from "react"
import { useLoadUserAvatar } from "@/lib/hooks/actions/user/preferences/use-load-user-avatar"
import { VariantProps, cva } from "class-variance-authority"
import { FaRegUser } from "react-icons/fa"
import Image from "next/image"
import { UserGeneric } from "@/types/entities/user"

const userAvatarVariants = cva("", {
  variants: {
    variant: {
      default: "h-full w-full object-cover rounded-full",
      navbar: "h-[34px] w-[34px] rounded-full"
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
  const [isAvatar, setIsAvatar] = useState(false);
  const { data: avatar } = useLoadUserAvatar(user?.id)
  
  useEffect(() => {
    if (avatar !== '') {
      setIsAvatar(true)
    } else (
      setIsAvatar(false)
    )
  }, [])
  
  return (
    isAvatar ? (
      <Image
        src={avatar!}
        width={600}
        height={600}
        className={userAvatarVariants(({ variant, className }))}
        alt={user?.first_name || ""}
      />
    ) : (
      <div className="flex items-center bg-neutral-700 w-full h-full justify-center">
        <FaRegUser size={46} />
      </div>
    )
  )
}