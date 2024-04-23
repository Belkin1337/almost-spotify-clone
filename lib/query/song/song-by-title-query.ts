import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { songByTitleQueryKey } from "@/lib/querykeys/song";
import { getSongsByTitle } from "@/lib/queries/song/multiple/get-songs-by-title";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useSongByTitleQuery = (
	title: string,
	count?: number
) => {
	return useQuery({
		queryKey: songByTitleQueryKey(title, count),
		queryFn: async () => {
			const { data, error } = await getSongsByTitle(supabase, title, count)

			if (error) throw error;

			return data;
		},
		enabled: !!title,
		retry: 1,
		placeholderData: keepPreviousData,
		refetchOnMount: false
	})
}