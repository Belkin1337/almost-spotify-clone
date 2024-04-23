import { getSongUrl } from "@/lib/queries/song/single/get-song-url";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongEntity } from "@/types/song";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { songByUrlQueryKey } from "@/lib/querykeys/song";

const supabase = createClient();

export function useLoadSongUrl(
	song: SongEntity | null
) {
	return useQuery({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: songByUrlQueryKey(song ? song : null, song ? song?.song_path : null),
		queryFn: async () => {
			if (song) {
				const { data } = await getSongUrl(supabase, song?.song_path);

				return data.publicUrl;
			} else {
				return null;
			}
		},
		enabled: !!song,
		retry: 1,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	})
}