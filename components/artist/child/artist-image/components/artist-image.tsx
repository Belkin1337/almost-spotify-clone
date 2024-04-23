import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import Image from "next/image"
import { artistImageVariants, IArtistImage } from "@/components/artist/child/artist-image/types/artist-image-types";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";

export const ArtistImage = ({
  variant,
  className,
  artist,
  ...props
}: IArtistImage) => {
  const { data: image } = useLoadImage(artist?.avatar_path!)

  if (!artist) return;
  
  return (
    <div className={artistImageVariants(({ variant, className }))} {...props}>
      <Image
        src={image?.url as string || nullAvatarImage}
        alt={artist?.name}
        title={artist?.name}
        width={400}
        height={400}
        loading="lazy"
        className={`${variant === "default" ? 'max-w-min' : variant === "list" && 'w-full'} h-full object-cover`}
      />
    </div>
  )
}