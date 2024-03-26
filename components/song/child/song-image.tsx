"use client"

import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { SongEntity } from "@/types/entities/song"
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog"
import { Skeleton } from "@/ui/skeleton"
import { VariantProps, cva } from "class-variance-authority"
import Image from "next/image"

const songImageVariants = cva("relative group justify-self-start", {
  variants: {
    variant: {
      follow: "min-h-[42px] min-w-[42px] rounded-md",
      library: "min-h-[48px] min-w-[48px] rounded-md",
      player: "min-h-[48px] min-w-[48px] cursor-pointer md:min-h-[64px] md:min-w-[64px] rounded-md",
      widget: "aspect-square w-full h-full rounded-lg cursor-pointer",
      select: "min-h-[34px] min-w-[34px] rounded-md",
      page: ""
    },
  },
  defaultVariants: {
    variant: "library"
  }
})

interface SongImageItemGeneric
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof songImageVariants> {
  song: SongEntity,
  children?: React.ReactNode
}

export const SongImageItem = ({
  variant,
  className,
  song,
  children
}: SongImageItemGeneric) => {
  const imageUrl = useLoadImage(song?.image_path!);

  if (!imageUrl) {
    return (
      <div className={songImageVariants(({
        variant,
        className
      }))}
      >
        <Skeleton className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div className={songImageVariants(({
      variant,
      className,
    }))}>
      {variant === "page" ? (
        <Dialog>
          <DialogTrigger>
            <Image
              src={imageUrl || "/images/liked.png"}
              width={660}
              height={660}
              loading="lazy"
              alt={song?.title || "Song"}
              className="min-w-[224px] object-cover max-w-[224px] max-h-[224px] 
              rounded-md min-h-[224px] shadow-lg shadow-black 
              cursor-pointer hover:scale-[1.06] 
              hover:duration-100 duration-100"
            />
          </DialogTrigger>
          <DialogContent className="w-[660px] h-[660px] p-0 rounded-lg overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                width={660}
                height={660}
                loading="lazy"
                alt={song?.title || "Song"}
                className="w-full h-full object-cover"
              />
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <Image
            fill
            src={imageUrl || "/images/liked.png"}
            alt={song?.title || "song"}
            loading="lazy"
            draggable="false"
            className="object-cover w-full h-full rounded-md"
          />
          {children}
        </>
      )}
    </div>
  )
}