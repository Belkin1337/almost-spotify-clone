import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { ArtistEntity } from "@/types/artist";
import { getArtistsBySingle } from "@/lib/queries/artist/multiple/get-artists-by-single";

const supabase = createClient();

export const useSingleArtistsQuery = (
	singleId: string
) => {
	return useQuery({
		queryKey: ["single_artists", singleId],
		queryFn: async () => {
			const { data, error } = await getArtistsBySingle(supabase, singleId);

			if (error) throw error;

			const artists: ArtistEntity[] = data?.map(item => item.artists).flat();

			return artists;
		},
		enabled: !!singleId,
		retry: 1,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})
}