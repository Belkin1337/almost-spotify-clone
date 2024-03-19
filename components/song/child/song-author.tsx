"use client"

import { artist_route } from "@/lib/constants/routes"
import { VariantProps, cva } from "class-variance-authority"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

const songAuthorVariants = cva("text-neutral-400 truncate", {
  variants: {
    variant: {
      default: "text-sm",
      player: "hover:underline hover:cursor-pointer text-sm",
      widget: "hover:underline text-lg cursor-pointer font-medium"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface SongAuthorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songAuthorVariants> {
  author: string,
  player?: boolean
}

export const SongAuthor = ({
  author,
  variant,
  className,
  player
}: SongAuthorProps) => {
  const { push } = useRouter()

  const targetToAuthor = useCallback(() => {
    if (player && author) {
      push(`${artist_route}/${author}`)
    }
  }, [push, author, player])

  return (
    <p
      onClick={targetToAuthor}
      className={songAuthorVariants(({
        variant, className
      }))}
    >
      {author}
    </p>
  )
}