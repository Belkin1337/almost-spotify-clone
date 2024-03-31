import { Typography } from "@/ui/typography"
import { ToggleWidgetButton } from "./widget-close-button"
import { SongImageItem } from "../../child/song-image"
import { SongItemTitle } from "../../child/song-title"
import { artist_route, song_route } from "@/lib/constants/routes"
import { useRouter } from "next/navigation"
import { SongEntity } from "@/types/entities/song"
import { SongArtist } from "../../child/song-artist"
import { useQuery } from "@tanstack/react-query"
import { getArtistsById } from "@/lib/queries/artist/get-artists-by-id"
import { createClient } from "@/lib/utils/supabase/client"
import { useCallback } from "react"

const supabase = createClient();

export const WidgetSongItem = ({
  song
}: {
  song: SongEntity
}) => {
  const { push } = useRouter();

  const handleToTrack = useCallback(() => {
    push(`${song_route}/${song?.id}`)
  }, [push, song?.id])

  if (!song) return;

  return (
    <>
      <div className="flex items-center justify-between">
        <SongArtist variant="widget_title" song={song} />
        <ToggleWidgetButton />
      </div>
      <div onClick={handleToTrack} className="max-w-[600px] max-h-[600px] overflow-hidden">
        <SongImageItem
          variant="widget"
          song={song}
        />
      </div>
      <div className="flex flex-col w-min">
        <SongItemTitle
          song={song}
          variant="widget"
        />
        <SongArtist
          variant="widget"
          song={song}
        />
      </div>
    </>
  )
}