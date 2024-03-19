"use client"

import { song_route } from "@/lib/constants/routes"
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
      player: "hover:underline hover:cursor-pointer text-sm font-medium",
      widget: "hover:underline text-xl cursor-pointer font-bold"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface SongTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songTitleVariants> {
  song: SongEntity,
  player?: boolean
}

export const SongTitle = ({
  song,
  variant,
  className,
  player
}: SongTitleProps) => {
  const { push } = useRouter()

  const targetToTrack = useCallback(() => {
    if (player && song) {
      push(`${song_route}/${song.id}`)
    }
  }, [push, song, player])

  return (
    <p onClick={targetToTrack} className={songTitleVariants(({
      variant,
      className
    }))}>
      {song?.title}
    </p>
  )
}