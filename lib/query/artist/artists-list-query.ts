import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArtistsAll } from "@/lib/queries/artist/multiple/get-artists-all";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { ArtistEntity } from "@/types/artist";
import { artistAllQueryKey } from "@/lib/querykeys/artist";

const supabase = createClient()

export const useAllArtistsList = () => {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: artistAllQueryKey,
		queryFn: async () => {
			const cache = queryClient.getQueryData<ArtistEntity[]>(artistAllQueryKey);

			if (!cache) {
				const { data, error } = await getArtistsAll(supabase);
				queryClient.setQueryData(artistAllQueryKey, data);

				return data;
			} else return cache
		},
		retry: 2,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	})
}