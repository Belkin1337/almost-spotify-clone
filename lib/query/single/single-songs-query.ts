import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongEntity } from "@/types/song";
import { getSongsBySingle } from "@/lib/queries/song/multiple/get-songs-by-single";

const supabase = createClient();

export const useSingleSongsQuery = (
	singleId: string
) => {
	return useQuery({
		queryKey: ["single_songs", singleId],
		queryFn: async () => {
			const { data, error } = await getSongsBySingle(supabase, singleId)

			if (error) throw error;

			const songs: SongEntity[] = data?.map(item => item.songs).flat();

			return songs;
		},
		enabled: !!singleId,
		retry: 1,
		refetchOnWindowFocus: false
	})
}