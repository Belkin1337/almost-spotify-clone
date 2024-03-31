import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { ArtistEntity } from "@/types/entities/artist"
import { cva, VariantProps } from "class-variance-authority"
import Image from "next/image"

const artistImageVariants = cva("flex justify-center items-center bg-black overflow-hidden", {
  variants: {
    variant: {
      default: "h-[420px]",
      list: "w-full h-full",
      select: "w-[22px] h-[22px]",
      search: "w-[160px] h-[160px] rounded-full"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface ArtistImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof artistImageVariants> {
  artist: ArtistEntity
}

export const ArtistImage = ({
  variant,
  className,
  artist,
  ...props
}: ArtistImageProps) => {
  const avatarUrl = useLoadImage(artist?.avatar_url!)

  if (!artist) return;
  
  return (
    <div className={artistImageVariants(({
      variant,
      className
    }))}
      {...props}
    >
      <Image
        src={avatarUrl || '/images/liked.png'}
        alt={artist?.name}
        title={artist?.name}
        width={400}
        height={400}
        loading="lazy"
        className={`
          ${variant === "default" ? 'max-w-min' : variant === "list" && 'w-full'} h-full object-cover`}
      />
    </div>
  )
}