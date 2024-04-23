import { useQuery } from "@tanstack/react-query";
import { getPlaylistById } from "@/lib/queries/playlist/single/get-playlist-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";

const supabase = createClient();

export const usePlaylistQuery = (
	playlistId: string
) => {
	return useQuery({
		queryKey: playlistByParamIdQueryKey(playlistId),
		queryFn: async () => {
			const { data, error } = await getPlaylistById(supabase, playlistId)

			if (error) throw error;

			return data;
		},
		enabled: !!playlistId,
		retry: 1,
		refetchOnMount: false,
		refetchOnWindowFocus: false
	})
}