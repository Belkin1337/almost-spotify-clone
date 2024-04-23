import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getFollowedArtists } from "@/lib/queries/artist/multiple/get-followed-artists";
import { userFollowedArtistsQueryKey } from "@/lib/querykeys/artist";

const supabase = createClient();

export const useFollowedArtistsQuery = (
	userId?: string
) => {
	return useQuery({
		queryKey: userFollowedArtistsQueryKey(userId),
		queryFn: async () => {
			const { data, error } = await getFollowedArtists(supabase, userId);

			if (error) throw error;

			const artists = data?.map(item => item.artists).flat()

			return artists;
		},
		enabled: !!userId,
		retry: 1,
		refetchOnWindowFocus: false
	})
}