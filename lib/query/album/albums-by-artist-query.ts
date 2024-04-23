import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAlbumsByArtist } from "@/lib/queries/album/multiple/get-albums-by-artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useAlbumByArtistQuery = (
	artistId: string,
	count?: number,
	enabled?: boolean
) => {
	return useQuery({
		queryKey: ["artist-albums", artistId, count],
		queryFn: async () => {
			const { data, error } = await getAlbumsByArtist(supabase, artistId, count);

			const albums = data?.map(item => item.albums).flat();

			return albums;
		},
		placeholderData: keepPreviousData,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		enabled: enabled ? enabled && !!artistId : !!artistId
	})
}