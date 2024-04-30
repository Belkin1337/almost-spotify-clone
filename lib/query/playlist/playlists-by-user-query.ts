import { useQuery } from "@tanstack/react-query";
import { getPlaylistsByUser } from "@/lib/queries/playlist/multiple/get-playlists-by-user";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const usePlaylistsListByUser = (
	userId?: string,
	show_hidden_playlists: boolean = false,
	count?: number
) => {
	return useQuery({
		queryKey: userPlaylistsQueryKey(userId, show_hidden_playlists, count),
		queryFn: async () => {
			const { data, error } = await getPlaylistsByUser(
				supabase,
				userId,
				show_hidden_playlists,
				count
			)

			if (error) throw error;

			return data;
		},
		enabled: !!userId,
		retry: 1,
		refetchOnWindowFocus: false
	})
}