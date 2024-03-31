import { useMemo } from "react"
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getSongById } from "@/lib/queries/song/get-song-by-id";
import { SongEntity } from "@/types/entities/song";
import { useToast } from "@/lib/hooks/ui/use-toast";

const supabase = createClient()

export const useGetSongById = (songId: string) => {
  const { toast } = useToast();
  const { data: song, error } = useQuery<SongEntity>(getSongById(
    supabase, 
    songId!
  ), {
    enabled: !!songId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  
  if (error) {
    toast({
      title: error.message,
      variant: "red"
    })
  }

  return useMemo(() => ({
    song,
  }), [song])
}