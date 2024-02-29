import { useMemo } from "react"
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getSongById } from "@/lib/queries/get-song-by-id";
import { SongEntity } from "@/types/entities/song";

const supabase = createClient()

export const useGetSongById = (songId: string) => {
  const { data: song, error } = useQuery<SongEntity>(getSongById(supabase, songId!), {
    enabled: songId !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (error) {
    throw new Error("Something wrong error")
  }
  
  return useMemo(() => ({
    song,
  }), [song])
}