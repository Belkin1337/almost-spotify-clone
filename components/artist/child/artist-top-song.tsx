import { SongItem } from "@/components/song/song-item";
import { getSongsAll } from "@/lib/queries/get-songs";
import { createClient } from "@/lib/utils/supabase/client"
import { SongEntity } from "@/types/entities/song";
import { Typography } from "@/ui/typography"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

const supabase = createClient();

export const ArtistTopSong = ({
  artistId
}: {
  artistId: string
}) => {
  const { 
    data: songs, 
    isError 
  } = useQuery<SongEntity[]>(getSongsAll(supabase))

  const sortedSongs = songs?.filter(song => song?.artists?.includes(artistId));

  if (isError) return;

  return (
    <div className="flex flex-col items-start w-full px-6">
      <Typography className="text-2xl font-bold">
        Popular
      </Typography>
      <div className="min-w-[620px] max-w-[620px] py-2 overflow-hidden rounded-md">
        {sortedSongs && (
          <div className="flex flex-col items-start w-full rounded-md overflow-hidden">
            {sortedSongs.map((song, idx) => (
              <SongItem
                variant="artist_library"
                key={song.id}
                type="page"
                song={song}
                list={{
                  id: String(idx + 1),
                  data: sortedSongs
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}