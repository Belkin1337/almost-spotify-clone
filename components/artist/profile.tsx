"use client"

import { ColoredBackground } from "@/ui/colored-background"
import { ArtistVerifyButton } from "./child/artist-verify-button"
import { ArtistTopSong } from "./child/artist-top-song"
import { ToolsBar } from "../lists/followed/child/followed-tools-bar"
import { usePlayer } from "@/lib/hooks/player/use-player"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { createClient } from "@/lib/utils/supabase/client"
import { ArtistEntity } from "@/types/entities/artist"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { getArtistById } from "@/lib/queries/get-artist-by-id"
import { ArtistListeners } from "./card/child/artist-listeners"
import { ArtistName } from "./card/child/artist-name"

const supabase = createClient();

export const ArtistProfileItem = ({
  artistId
}: {
  artistId: string
}) => {
  const { playerState } = usePlayer();

  const { data: artist, isError } = useQuery<ArtistEntity>(getArtistById(supabase, artistId), {
    enabled: !!artistId,
    retry: 1,
  })

  const avatarUrl = useLoadImage(artist?.avatar_url!);
  const coverUrl = useLoadImage(artist?.cover_image_url!);

  if (!artist || isError) return;

  return (
    <div className="w-full">
      <ColoredBackground imageUrl={avatarUrl!} />
      <div className="-top-[84px] relative overflow-hidden h-[404px] p-6 bg-no-repeat bg-cover z-20 bg-center"
        style={{
          backgroundImage: `url(${coverUrl})`
        }}
      >
        <div className="relative gap-y-2 z-20 flex flex-col justify-end h-full items-start">
          <ArtistVerifyButton />
          <ArtistName
            artist={artist}
            variant="page"
          />
          <ArtistListeners
            artist={artist}
            variant="page"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-6 py-4 w-full relative -top-[84px]">
        <ToolsBar
          list={playerState.ids}
          variant="artist"
          song={playerState.active!}
        />
        <ArtistTopSong artistId={artistId} />
      </div>
    </div>
  )
}