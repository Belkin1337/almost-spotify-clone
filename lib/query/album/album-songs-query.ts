import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getSongsByAlbum } from "@/lib/queries/song/multiple/get-songs-by-album";
import { SongEntity } from "@/types/song";
import { albumSongsQueryKey } from "@/lib/querykeys/album";

const supabase = createClient();

export const useAlbumSongsQuery = (
	albumId: string
) => {
	return useQuery({
		queryKey: albumSongsQueryKey(albumId),
		queryFn: async () => {
			const { data, error } = await getSongsByAlbum(supabase, albumId)

			if (error) throw error;

			const songs: SongEntity[] = data?.map(item => item.songs).flat();

			return songs;
		},
		enabled: !!albumId,
		retry: 1,
		refetchOnWindowFocus: false
	})
}