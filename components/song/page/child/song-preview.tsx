import { FaCircle } from "react-icons/fa"
import { SongItemTitle } from "../../child/song-title"
import { SongType } from "../../child/song-type"
import { SongTimestamp } from "../../child/song-timestamp"
import { SongEntity } from "@/types/entities/song"
import { getArtistsById } from "@/lib/queries/artist/get-artists-by-id"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/utils/supabase/client"
import { SongArtist } from "../../child/song-artist"
import { SONG_TYPE_ALBUM, SONG_TYPE_SINGLE } from "@/lib/constants/preview"
import { EntityType } from "@/ui/entity-type"
import { Timestamp } from "@/ui/timestamp"

const supabase = createClient();

export const SongItemPagePreview = ({
  song,
  type
}: {
  song: SongEntity,
  type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM
}) => {
  const { data: artists, isError } = useQuery({
    queryKey: ['artists', song.artists],
    queryFn: () => getArtistsById(supabase, song.artists),
    enabled: !!song,
    retry: song?.artists?.length || 2
  })

  if (isError) return;

  return (
    <div className="flex flex-col gap-y-2 self-end">
      <EntityType type={type} />
      <SongItemTitle
        variant="page"
        song={song}
      />
      <div className="flex items-center gap-x-2">
        <SongArtist
          variant="page"
          song={song}
          className="text-white font-semibold"
        />
        <Timestamp date={song.created_at} />
      </div>
    </div>
  )
}