import { useQuery } from "@tanstack/react-query";
import { getGenreById } from "@/lib/queries/genre/single/get-genre-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { genreByParamQueryKey } from "@/lib/querykeys/genre";

const supabase = createClient();

export const useGenreQuery = (
	genreId: string
) => {
	return useQuery({
		queryKey: genreByParamQueryKey(genreId),
		queryFn: async () => {
			const { data, error } = await getGenreById(supabase, genreId);

			if (error) return;

			return data;
		},
		retry: 1,
		enabled: !!genreId,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})
}