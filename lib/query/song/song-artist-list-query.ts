import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArtistBySong } from "@/lib/queries/artist/single/get-artist-by-song";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { songArtistsQueryKey } from "@/lib/querykeys/song";

const supabase = createClient();

export const useSongArtistListQuery = (
	songId?: string
) => {
	return useQuery({
		queryKey: songArtistsQueryKey(songId),
		queryFn: async () => {
			const { data, error } = await getArtistBySong(supabase, songId)

			if (error) throw error;

			const artists = data?.map(item => item.artists).flat();
			const firstArtist = artists[0];

			return { artists, firstArtist }
		},
		placeholderData: keepPreviousData,
		enabled: !!songId,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})
}