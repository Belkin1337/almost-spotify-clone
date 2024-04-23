import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getSongsAll } from "@/lib/queries/song/multiple/get-songs-all";
import { songsAllQueryKey } from "@/lib/querykeys/song";

const supabase = createClient();

export const useSongsAllQuery = (
	count?: number
) => {
	return useQuery({
		queryKey: songsAllQueryKey(count),
		queryFn: async () => {
			const { data, error } = await getSongsAll(supabase, count);

			if (error) return;

			const songs = data?.map(item => item).flat();

			return songs;
		},
		retry: 1,
		placeholderData: keepPreviousData
	})
}