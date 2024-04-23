import { getRecentArtists } from "@/lib/queries/artist/multiple/get-recent-artists";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useUserRecentArtistsQuery = (
	userId: string
) => {
	return useQuery({
		queryKey: ["recent_artists", userId],
		queryFn: async () => {
			const { data, error } = await getRecentArtists(supabase, userId)

			if (error) return;

			const artists = data?.map(item => item.artists).flat();

			return artists;
		},
		enabled: !!userId,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		placeholderData: keepPreviousData
	})
}