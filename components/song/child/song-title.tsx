"use client"

import { SongEntity } from "@/types/entities/song"
import { VariantProps, cva } from "class-variance-authority"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"

const songTitleVariants = cva("text-white truncate", {
  variants: {
    variant: {
      default: "",
      library: "text-md font-medium",
      page: "font-bold text-6xl",
      player: "hover:underline hover:cursor-pointer text-sm font-medium"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface SongTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songTitleVariants> {
  data: SongEntity,
  player?: boolean
}

export const SongTitle = ({
  data,
  variant,
  className,
  player
}: SongTitleProps) => {
  const router = useRouter()

  const targetToTrack = useCallback(() => {
    if (player && data) {
      router.push(`/home/track/${data.id}`)
    } else {
      return null
    }
  }, [router, data, player])

  return (
    <p onClick={targetToTrack} className={songTitleVariants(({
      variant,
      className
    }))}>
      {data?.title}
    </p>
  )
}