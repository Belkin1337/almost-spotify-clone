import { useQuery } from "@tanstack/react-query";
import { getAlbumByUser } from "@/lib/queries/album/single/get-album-by-user";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { userAlbumQueryKey } from "@/lib/querykeys/album";

const supabase = createClient();

export const useAlbumsByUser = (
	userId: string
) => {
	return useQuery({
		queryKey: userAlbumQueryKey(userId),
		queryFn: async () => {
			const { data, error } = await getAlbumByUser(supabase, userId)

			if (error) throw error;

			return data;
		},
		enabled: !!userId,
		retry: 1
	})
}