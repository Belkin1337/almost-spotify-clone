"use client"

import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { SongEntity } from "@/types/entities/song"
import { VariantProps, cva } from "class-variance-authority"
import Image from "next/image"

const songImageVariants = cva("relative overflow-hidden group justify-self-start", {
  variants: {
    imageVariant: {
      follow: "min-h-[42px] min-w-[42px] rounded-md",
      library: "h-[48px] w-[48px] rounded-md",
      player: "min-h-[48px] min-w-[48px] cursor-pointer md:min-h-[64px] md:min-w-[64px] rounded-md",
      widget: "aspect-square w-full h-full rounded-lg cursor-pointer"
    },
  },
  defaultVariants: {
    imageVariant: "library"
  }
})

interface SongImageItemGeneric
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof songImageVariants> {
  song: SongEntity,
  children?: React.ReactNode
}

export const SongImageItem = ({
  imageVariant,
  className,
  song,
  children
}: SongImageItemGeneric) => {
  const imageUrl = useLoadImage(song?.image_path!);

  return (
    <div className={songImageVariants(({
      imageVariant,
      className,
    }))}>
      <Image
        fill
        src={imageUrl || "/images/liked.png"}
        alt={song?.title || "song"}
        loading="lazy"
        draggable="false"
        className="object-cover"
      />
      {children}
    </div>
  )
}