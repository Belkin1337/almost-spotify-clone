import { Typography } from "@/ui/typography";
import { useAllArtistsList } from "@/lib/query/artist/artists-list-query";
import { ArtistListType } from "@/components/artist/components/list/types/artist-list-types";
import dynamic from "next/dynamic";

const ArtistCard = dynamic(() => import("@/components/artist/components/card/components/artist-card")
  .then(mod => mod.ArtistCard));

export const ArtistList = ({
  type
}: {
  type: ArtistListType
}) => {
  const { data: artists, isLoading } = useAllArtistsList();

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
              isLoading={isLoading}
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
              isLoading={isLoading}
            />
          ))
        )}
      </div>
    </>
  )
}