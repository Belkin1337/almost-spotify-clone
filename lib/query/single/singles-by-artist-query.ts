import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSinglesByArtist } from "@/lib/queries/single/multiple/get-singles-by-artist";

const supabase = createClient()

export const useSinglesByArtist = (
	artistId: string,
	count?: number
) => {
	return useQuery({
		queryKey: ["artist_singles", artistId, count],
		queryFn: async () => {
			const { data, error } = await getSinglesByArtist(supabase, artistId, count)

			if (error) return;

			const singles = data?.map(item => item.singles).flat();

			return singles
		},
		placeholderData: keepPreviousData,
		retry: 1,
		enabled: !!artistId
	})
}