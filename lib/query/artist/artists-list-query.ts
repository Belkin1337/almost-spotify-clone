import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArtistsAll } from "@/lib/queries/artist/multiple/get-artists-all";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { artistAllQueryKey } from "@/lib/querykeys/artist";

const supabase = createClient()

export const useAllArtistsList = (
	count?: number
) => {
	return useQuery({
		queryKey: artistAllQueryKey(count),
		queryFn: async () => {
			const { data, error } = await getArtistsAll(supabase, count);

			if (error) throw error;

			return data;
		},
		retry: 1,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	})
}