import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAlbumById } from "@/lib/queries/album/single/get-album-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { albumByIdQueryKey } from "@/lib/querykeys/album";

const supabase = createClient();

export const useAlbumQuery = (
	albumId: string
) => {
	return useQuery({
		queryKey: albumByIdQueryKey(albumId),
		queryFn: async () => {
			const { data, error } = await getAlbumById(supabase, albumId);

			if (error) throw error;

			return data;
		},
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!albumId
	})
}