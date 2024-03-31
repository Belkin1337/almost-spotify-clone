import { cva, VariantProps } from "class-variance-authority"
import { ArtistImage } from "./child/artist-image"
import { ArtistEntity } from "@/types/entities/artist"
import { ArtistName } from "./child/artist-name"
import { Typography } from "@/ui/typography"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { artist_route } from "@/lib/constants/routes"

const artistCardVariants = cva("flex overflow-hidden", {
  variants: {
    variant: {
      default: "",
      search: "flex-col gap-y-4 cursor-pointer hover:bg-neutral-800 p-4 rounded-md h-[260px] w-[220px]"
    }
  }
})

interface ArtistCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof artistCardVariants> {
  artist: ArtistEntity
}

export const ArtistCard = ({
  variant,
  artist,
  className,
  ...props
}: ArtistCardProps) => {
  const { push } = useRouter();

  const handlePushArtist = useCallback(() => {
    push(`${artist_route}/${artist?.id}`)
  }, [artist?.id, push])

  return (
    <div
      onClick={handlePushArtist}
      className={artistCardVariants(({
        variant,
        className
      }))}
      {...props}
    >
      <div className="flex flex-col items-center w-full">
        <ArtistImage
          variant={variant === 'search' ? 'search' : 'default'}
          artist={artist}
        />
      </div>
      <div className="flex flex-col">
        <ArtistName
          variant={variant === 'search' ? 'search' : 'default'}
          artist={artist}
        />
        <Typography className="!text-neutral-400 text-sm">
          Artist
        </Typography>
      </div>
    </div>
  )
}