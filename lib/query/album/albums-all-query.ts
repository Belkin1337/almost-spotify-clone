import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAlbumsAll } from "@/lib/queries/album/multiple/get-albums-all";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useAlbumsAllQuery = (
	count?: number
) => {
	return useQuery({
		queryKey: ["albums", count],
		queryFn: async () => {
			const { data, error } = await getAlbumsAll(supabase, count)

			if (error) return;

			return data
		},
		placeholderData: keepPreviousData,
		retry: 1
	})
}