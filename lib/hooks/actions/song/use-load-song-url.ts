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
  const { data, isError } = useQuery<LoadedSong>({
    queryKey: ["songUrl", song?.song_path],
    queryFn: async () => {
      try {
        const publicUrl = await getSongUrl(
          supabase, 
          song?.song_path
        );
        return { song: { 
          publicUrl 
        } };
      } catch (error) {
        throw new Error("Failed to fetch song URL");
      }
    },
  })

  return {
    data,
    isError
  };
}