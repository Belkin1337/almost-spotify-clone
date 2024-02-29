"use client"

import { SongEntity } from "@/types/entities/song"
import { VariantProps, cva } from "class-variance-authority"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

const songAuthorVariants = cva("text-neutral-400 text-sm truncate", {
  variants: {
    variant: {
      default: "",
      player: "hover:underline hover:cursor-pointer"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface SongAuthorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songAuthorVariants> {
  data: SongEntity,
  player?: boolean
}

export const SongAuthor = ({
  data,
  variant,
  className,
  player
}: SongAuthorProps) => {
  const router = useRouter()

  const targetToAuthor = useCallback(() => {
    if (player && data) {
      router.push(`/home/artist/${data.author}`)
    } else {
      return null
    }
  }, [router, data, player])

  return (
    <p onClick={targetToAuthor} className={songAuthorVariants(({ variant, className }))}>
      {data?.author}
    </p>
  )
}