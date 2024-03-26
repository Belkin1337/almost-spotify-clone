import { Typography } from "@/ui/typography"
import { ToggleWidgetButton } from "./widget-close-button"
import { SongImageItem } from "../../child/song-image"
import { SongTitle } from "../../child/song-title"
import { artist_route, song_route } from "@/lib/constants/routes"
import { useRouter } from "next/navigation"
import { SongEntity } from "@/types/entities/song"
import { SongArtist } from "../../child/song-artist"
import { useQuery } from "@tanstack/react-query"
import { getArtistsById } from "@/lib/queries/get-artists-by-id"
import { createClient } from "@/lib/utils/supabase/client"

const supabase = createClient();

export const WidgetSongItem = ({
  song
}: {
  song: SongEntity
}) => {
  const { data: artists } = useQuery({
    queryKey: ['artists', song.artists],
    queryFn: () => getArtistsById(supabase, song.artists),
    enabled: !!song,
    retry: song?.artists?.length || 2
  })

  const { push } = useRouter();

  if (!song) return;

  return (
    <>
      <div className="flex items-center justify-between">
        {artists?.map((artist) => (
          <Typography
            key={artist.id}
            font="bold"
            className="text-white font-bold"
            variant="link"
            onClick={() => {
              push(`${artist_route}/${artist.id}`)
            }}
          >
            {artist.name}
          </Typography>
        ))}
        <ToggleWidgetButton />
      </div>
      <SongImageItem
        variant="widget"
        song={song}
        onClick={() => {
          push(`${song_route}/${song?.id}`)
        }}
      />
      <div className="flex flex-col w-min">
        <SongTitle
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