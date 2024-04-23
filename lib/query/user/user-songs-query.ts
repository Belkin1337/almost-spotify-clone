import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSongsByUserId } from "@/lib/queries/song/multiple/get-songs-by-userId";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongsType } from "@/lib/constants/ui/sort-songs";
import { userSongsQueryKey } from "@/lib/querykeys/user";
import { SortType } from "@/components/user/components/for-authors/user-tracks/types/user-tracks-types";

const supabase = createClient();

export const useUserSongsQuery = (
	userId: string,
	sortType?: SortType,
	currentType?: SongsType
) => {
	return useQuery({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: userSongsQueryKey(userId),
		queryFn: async () => {
			const { data, error } = await getSongsByUserId({
				client: supabase,
				userId: userId,
				order: sortType?.orderType
			})

			if (error) {
				throw error;
			}

			return data;
		},
		enabled: sortType?.orderType ? (!!userId && currentType === 'all') : !!userId,
	})
}