import { artistImageVariants, IArtistImage } from "@/components/artist/child/artist-image/types/artist-image-types";
import { ImageCover } from "@/ui/image-cover";

export const ArtistImage = ({
  variant, className, artist, ...props
}: IArtistImage) => {

  if (!artist) return;
  
  return (
    <div className={artistImageVariants(({ variant, className }))} {...props}>
      <ImageCover path={artist.avatar_path} title={artist.name} />
    </div>
  )
}