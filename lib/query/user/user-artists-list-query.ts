import { getArtistsByUserId } from "@/lib/queries/artist/multiple/get-artists-by-user";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { SongsType } from "@/lib/constants/ui/sort-songs";
import { userArtistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useUserArtistListQuery = (
	userId: string,
	songsType?: SongsType
) => {
	return useQuery({
		queryKey: userArtistsQueryKey(userId),
		queryFn: async () => {
			const { data: artists } = await getArtistsByUserId(supabase, userId);

			return artists;
		},
		enabled: songsType ? !!userId || songsType === 'by_artist' : !!userId,
	})
}