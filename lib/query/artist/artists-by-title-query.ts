import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getArtistsByName } from "@/lib/queries/artist/multiple/get-artists-by-name";
import { artistsByTitleQueryKey } from "@/lib/querykeys/artist";

const supabase = createClient();

export const useArtistsByNameQuery = (
	name: string,
	count?: number
) => {
	return useQuery({
		queryKey: artistsByTitleQueryKey(name, count),
		queryFn: async () => {
			const { data, error } = await getArtistsByName(supabase, name, count)

			if (error) throw error;

			return data;
		},
		enabled: !!name,
		retry: 1,
		placeholderData: keepPreviousData,
		refetchOnMount: false
	})
}