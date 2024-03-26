import { ArtistEntity } from "@/types/entities/artist"
import { Typography } from "@/ui/typography"

export const ArtistFollowers = ({
  artist
}: {
  artist: ArtistEntity
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Typography className="text-3xl text-white !font-bold">
        {artist?.followers}
      </Typography>
      <Typography className="text-sm">
        followers
      </Typography>
    </div>
  )
}