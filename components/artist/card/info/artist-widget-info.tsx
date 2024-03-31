"use client"

import { SongEntity } from "@/types/entities/song"
import { Typography } from "@/ui/typography"
import { createClient } from "@/lib/utils/supabase/client"
import { getArtistById } from "@/lib/queries/artist/get-artist-by-id"
import { ArtistEntity } from "@/types/entities/artist"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { ArtistName } from "../child/artist-name"
import { ArtistDescription } from "../child/artist-description"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { useCallback } from "react"
import { ArtistInfoCard } from "../playlist/artist-info-card"
import Image from "next/image"
import { ArtistListeners } from "../child/artist-listeners"
import { ArtistFollowButton } from "../child/artist-follow"

const supabase = createClient();

export const ArtistWidgetCard = ({
  song
}: {
  song: SongEntity
}) => {
  const { openDialog } = useDialog();

  const { data: artist, isError } = useQuery<ArtistEntity>(getArtistById(supabase, song.artists[0]), {
    enabled: !!song,
    retry: 1,
  })

  const avatarUrl = useLoadImage(artist?.avatar_url!)

  const handleArtistInfo = useCallback(() => {
    if (artist) {
      openDialog({
        dialogChildren: <ArtistInfoCard artist={artist} />
      })
    }
  }, [artist, openDialog])

  if (isError || !artist) return;

  return (
    <div onClick={handleArtistInfo} className="flex flex-col items-start w-full rounded-lg cursor-pointer overflow-hidden bg-neutral-800">
      <div className="flex flex-col relative h-[320px] w-full p-4">
        <Image
          src={avatarUrl as string}
          alt={artist.name}
          width={1200}
          height={12600}
          loading="lazy"
          draggable="false"
          className="w-full h-full object-center absolute right-0 top-0 bottom-0 left-0 object-cover"
        />
        <div className="flex flex-col items-start relative">
          <Typography className="text-white text-lg !font-bold">
            Об исполнителе
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-2 max-h-[200px] w-full p-4 overflow-hidden">
        <ArtistName artist={artist} />
        <div className="flex items-center justify-between w-full">
          <ArtistListeners variant="card" artist={artist} />
          <ArtistFollowButton />
        </div>
        <div className="overflow-hidden h-[60px]">
          <ArtistDescription artist={artist} />
        </div>
      </div>
    </div>
  )
}