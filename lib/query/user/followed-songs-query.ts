import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFollowedSongs } from "@/lib/queries/song/multiple/get-followed-songs";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { followedSongsQueryKey } from "@/lib/querykeys/song";

const supabase = createClient();

export const useFollowedSongsQuery = (
	userId?: string,
	count?: number
) => {
	return useQuery({
		queryKey: followedSongsQueryKey(userId, count),
		queryFn: async () => {
			const { data } = await getFollowedSongs(supabase, userId, count);

			if (data) {
				const songs = data?.map(item => item.songs).flat();

				return { songs };
			}
		},
		enabled: !!userId,
		placeholderData: keepPreviousData,
		retry: 1
	})
}