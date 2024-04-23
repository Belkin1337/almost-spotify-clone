import { ArtistEntity } from "@/types/artist"
import { Typography } from "@/ui/typography"

export const ArtistFollowers = ({
  artist
}: {
  artist: ArtistEntity
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Typography className="text-3xl" text_color="white" font="bold">
        {artist?.followers}
      </Typography>
      <Typography size="small">
        followers
      </Typography>
    </div>
  )
}