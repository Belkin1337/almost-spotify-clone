import { FaCircle } from "react-icons/fa"
import { SongTitle } from "../../child/song-title"
import { SongType } from "../../child/song-type"
import { SongTimestamp } from "../../child/song-timestamp"
import { SongEntity } from "@/types/entities/song"
import { getArtistsById } from "@/lib/queries/get-artists-by-id"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/utils/supabase/client"
import { SongArtist } from "../../child/song-artist"

const supabase = createClient();

export const SongItemPagePreview = ({
  song
}: {
  song: SongEntity
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
      <SongType
        type="Сингл"
      />
      <SongTitle
        variant="page"
        song={song}
      />
      <div className="flex items-center gap-x-2">
        <SongArtist
          page
          variant="page"
          song={song}
          className="text-white font-semibold"
        />
        <FaCircle size={4} className="fill-white" />
        <SongTimestamp date="2024" />
      </div>
    </div>
  )
}