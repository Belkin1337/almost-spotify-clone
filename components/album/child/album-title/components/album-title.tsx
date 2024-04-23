import React from "react";
import { albumTitleVariants, IAlbumTitle } from "@/components/album/child/album-title/types/album-title-types";

export const AlbumTitle = ({ 
  variant, 
  album,
  className, 
  ...props 
}: IAlbumTitle) => {
  return (
    <p className={albumTitleVariants(({
      variant,
      className
    }))}
       {...props}
    >
      {album?.title}
    </p>
  )
}