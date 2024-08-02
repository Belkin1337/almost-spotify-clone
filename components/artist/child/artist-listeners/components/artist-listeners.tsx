import { Typography } from "@/ui/typography"
import { ArtistListenersBlock } from "@/components/artist/child/artist-listeners/components/artist-listeners-block";
import {
  artistListenersVariants,
  IArtistListeners
} from "@/components/artist/child/artist-listeners/types/artist-listeners-types";

export const ArtistListeners = ({
  variant, className, artist
}: IArtistListeners) => {
  return (
    <ArtistListenersBlock variant={variant !== 'default' ? "page" : "default"}>
      <Typography className={artistListenersVariants(({ variant, className }))}>
        {artist?.listeners || 0}
      </Typography>
    </ArtistListenersBlock>
  )
}