"use client"

import { SongEntity } from "@/types/entities/song"
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog"
import { Typography } from "@/ui/typography"
import { createClient } from "@/lib/utils/supabase/client"
import { getArtistById } from "@/lib/queries/get-artist-by-id"
import { ArtistEntity } from "@/types/entities/artist"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { ArtistName } from "../child/artist-name"
import { ArtistDescription } from "../child/artist-description"
import { ArtistImage } from "../child/artist-image"
import { ArtistFollowers } from "../child/artist-followers"
import { ArtistListeners } from "../child/artist-listeners"

const supabase = createClient();

export const ArtistWidgetCard = ({
  song
}: {
  song: SongEntity
}) => {
  const { data: artist, isError } = useQuery<ArtistEntity>(getArtistById(supabase, song.artists[0]), {
    enabled: !!song,
    retry: 1,
  })

  const avatarUrl = useLoadImage(artist?.avatar_url!)

  if (isError || !artist) return;

  return (
    <Dialog>
      <DialogTrigger className="flex items-start justify-start">
        <div className="flex flex-col items-start w-full rounded-lg overflow-hidden bg-neutral-800">
          <div className="flex flex-col h-[240px] w-full overflow-hidden p-4 bg-cover bg-center" style={{
            backgroundImage: `url(${avatarUrl})`
          }}>
            <div className="flex flex-col items-start">
              <Typography className="text-white text-lg !font-bold">
                Об исполнителе
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-2 p-4">
            <ArtistName artist={artist} />
            <ArtistDescription artist={artist} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col p-0 w-[820px] overflow-hidden ">
        <ArtistImage artist={artist} />
        <div className="flex items-start w-full pb-10 pt-4 px-6 overflow-y-auto h-full verflow-x-hidden">
          <div className="flex flex-col w-1/3 gap-y-6">
            <ArtistFollowers artist={artist} />
            <ArtistListeners artist={artist} />
          </div>
          <div className="flex flex-col w-max">
            <ArtistDescription artist={artist}/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}