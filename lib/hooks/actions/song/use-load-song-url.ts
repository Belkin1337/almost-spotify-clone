import { getSongUrl } from "@/lib/queries/get-song-url";
import { createClient } from "@/lib/utils/supabase/client";
import { SongEntity } from "@/types/entities/song";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

type LoadedSong = {
  song: {
    publicUrl: string
  }
}

export function useLoadSongUrl(song: SongEntity) {
  const queryKey = ["songUrl", song?.song_path];

  const { data } = useQuery<LoadedSong>({
    queryKey: queryKey,
    enabled: !!song,
    queryFn: async () => {
      const publicUrl = await getSongUrl(supabase, song?.song_path);

      return { song: { 
        publicUrl 
      } };
    },
  })

  return data?.song.publicUrl ?? null;
}