import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArtistById } from "@/lib/queries/artist/single/get-artist-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { artistByIdQueryKey } from "@/lib/querykeys/artist";

const supabase = createClient();

export const useArtistQuery = (
	artistId: string
) => {
	return useQuery({
		queryKey: artistByIdQueryKey(artistId),
		queryFn: async () => {
			const { data, error } = await getArtistById(supabase, artistId);

			if (error) throw error;

			return data;
		},
		retry: 1,
		enabled: !!artistId,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	})
}