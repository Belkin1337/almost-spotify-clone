import { ArtistEntity } from "@/types/entities/artist"
import { Typography } from "@/ui/typography"

export const ArtistDescription = ({
  artist
}: {
  artist: ArtistEntity
}) => {
  return (
    <Typography className="text-left text-sm text-neutral-400 !font-medium whitespace-pre-wrap">
      {artist?.description}
    </Typography>
  )
}