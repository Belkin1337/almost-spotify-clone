import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAlbumBySong } from "@/lib/queries/album/single/get-album-by-song";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { albumBySongQueryKey } from "@/lib/querykeys/album";

const supabase = createClient();

export const useAlbumBySong = (
	songId: string
) => {
	return useQuery({
		queryKey: albumBySongQueryKey(songId),
		queryFn: async () => {
			const { data, error } = await getAlbumBySong(supabase, songId)

			if (error) throw error;

			const albums = data?.map(item => item.albums).flat();

			return albums;
		},
		enabled: !!songId,
		retry: 1,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})
}