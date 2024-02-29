"use client"

import { VariantProps, cva } from "class-variance-authority"

const songImageVariants = cva("relative rounded-md overflow-hidden group justify-self-start", {
  variants: {
    imageVariant: {
      follow: "min-h-[42px] min-w-[42px]",
      library: "h-[48px] w-[48px]",
      player: "min-h-[48px] min-w-[48px] cursor-pointer md:min-h-[64px] md:min-w-[64px]"
    },
  },
  defaultVariants: {
    imageVariant: "library"
  }
})

interface SongImageItemGeneric
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof songImageVariants> {
    children: React.ReactNode
  }

export const SongImageItem = ({
  imageVariant,
  className,
  children
}: SongImageItemGeneric) => {
  return (
    <div className={songImageVariants(({
      imageVariant,
      className
    }))}>
      {children}
    </div>
  )
}