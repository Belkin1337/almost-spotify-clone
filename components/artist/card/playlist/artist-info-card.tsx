import { ArtistEntity } from "@/types/entities/artist"
import { ArtistDescription } from "../child/artist-description"
import { ArtistFollowers } from "../child/artist-followers"
import { ArtistImage } from "../child/artist-image"
import { ArtistListeners } from "../child/artist-listeners"

export const ArtistInfoCard = ({
  artist
}: {
  artist: ArtistEntity
}) => {
  return (
    <div className="flex flex-col w-[840px]">
      <ArtistImage artist={artist} className="relative"/>
      <div className="flex items-start w-full p-4 overflow-hidden">
        <div className="flex flex-col w-1/3 gap-y-6">
          <ArtistFollowers artist={artist} />
          <ArtistListeners artist={artist} />
        </div>
        <div className="flex flex-col w-2/3">
          <ArtistDescription artist={artist} />
        </div>
      </div>
    </div>
  )
}