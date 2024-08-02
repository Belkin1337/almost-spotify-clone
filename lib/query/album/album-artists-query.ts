import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getArtistsByAlbum } from "@/lib/queries/artist/multiple/get-artists-by-album";
import { ArtistEntity } from "@/types/artist";
import { albumArtistsQueryKey } from "@/lib/querykeys/album";

const supabase = createClient();

export const useAlbumArtistsQuery = (albumId: string) => {
	return useQuery({
		queryKey: albumArtistsQueryKey(albumId),
		queryFn: async () => {
			const { data, error } = await getArtistsByAlbum(supabase, albumId);

			if (error) throw error;

			const artists: ArtistEntity[] = data?.map(item => item.artists).flat();

			return artists;
		},
		enabled: !!albumId,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})
}