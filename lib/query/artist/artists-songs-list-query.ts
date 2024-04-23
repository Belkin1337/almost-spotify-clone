import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSongsByArtist } from "@/lib/queries/song/multiple/get-songs-by-artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongEntity } from "@/types/song";
import { artistSongsQueryKey } from "@/lib/querykeys/artist";

const supabase = createClient();

export const useArtistSongListQuery = (
	artistId: string,
	count?: number,
) => {
	return useQuery({
		queryKey: artistSongsQueryKey(artistId, count),
		queryFn: async () => {
			const { data, error } = await getSongsByArtist(
				supabase,
				artistId,
				count,
			);

			if (error) throw error;

			const songs: SongEntity[] = data?.map(item => item.songs).flat();

			return songs;
		},
		enabled: !!artistId,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})
}