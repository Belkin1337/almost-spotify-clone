import { useQuery } from "@tanstack/react-query";
import { getArtistsOrderByFollowers } from "@/lib/queries/artist/multiple/get-artists-order-by-followers";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useArtistsOrderByFollowers = () => {
	return useQuery({
		queryKey: ["artists_by_followers"],
		queryFn: async () => {
			const { data, error } = await getArtistsOrderByFollowers(supabase);

			if (error) throw error;

			const artists = data.map(item => item.artists).flat();

			return artists;
		},
		retry: 1,
		refetchOnWindowFocus: false
	})
}