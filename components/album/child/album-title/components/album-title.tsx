import { albumTitleVariants, IAlbumTitle } from "@/components/album/child/album-title/types/album-title-types";

export const AlbumTitle = ({ 
  variant, album, className, ...props
}: IAlbumTitle) => {
  if (!album.title) return;
  return (
    <p className={albumTitleVariants(({ variant, className }))} {...props}>
      {album.title}
    </p>
  )
}