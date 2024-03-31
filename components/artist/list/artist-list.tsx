import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { ArtistCard } from "../card/artist-card"
import { Typography } from "@/ui/typography";
import { ArtistEntity } from "@/types/entities/artist";
import { getArtistsAll } from "@/lib/queries/artist/get-artists-all";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export type ArtistListType = "sliced" | "all"

export const ArtistList = ({
  type
}: {
  type: ArtistListType
}) => {
  const { data: artists } = useQuery<ArtistEntity[]>(getArtistsAll(supabase))

  if (!artists) return (<Typography>Артистов не найдено.</Typography>);

  return (
    <>
      <div className="flex flex-wrap overflow-hidden">
        {type === 'sliced' && (
          artists.slice(0, 6).map(artist => (
            <ArtistCard
              variant="search"
              key={artist.id}
              artist={artist}
            />
          ))
        )}
      </div>
      <div className="flex flex-wrap overflow-hidden">
        {type === 'all' && (
          artists.map(artist => (
            <ArtistCard
              variant="search"
              key={artist.id}
              artist={artist}
            />
          ))
        )}
      </div>
    </>
  )
}