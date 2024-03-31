import { AlbumEntity } from "@/types/entities/album"
import { cva, VariantProps } from "class-variance-authority"
import React from "react";

const albumTitleVariants = cva("text-white truncate", {
  variants: {
    variant: {
      default: "",
      page: "font-bold text-6xl",
    }
  }
})

interface AlbumTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof albumTitleVariants> {
    album: AlbumEntity
  }

export const AlbumTitle = ({ 
  variant, 
  album,
  className, 
  ...props 
}: AlbumTitleProps) => {
  return (
    <p className={albumTitleVariants(({ variant, className}))} {...props}>
      {album?.title}
    </p>
  )
}