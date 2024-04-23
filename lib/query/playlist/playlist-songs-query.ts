import { useQuery } from "@tanstack/react-query";
import { getSongsByPlaylist } from "@/lib/queries/song/multiple/get-songs-by-playlist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { playlistSongsQueryKey } from "@/lib/querykeys/playlist";

const supabase = createClient();

export const usePlaylistSongsQuery = (
	playlistId: string,
) => {
	return useQuery({
		queryKey: playlistSongsQueryKey(playlistId),
		queryFn: async () => {
			const { data, error } = await getSongsByPlaylist(supabase, playlistId)

			if (error) return;

			const songs = data?.map(item => item.songs).flat();

			return songs
		},
		enabled: !!playlistId
	})
}