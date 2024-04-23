import { useQuery } from "@tanstack/react-query";
import { getGenreList } from "@/lib/queries/genre/single/get-genre-list";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { genresQueryKey } from "@/lib/querykeys/genre";

const supabase = createClient();

export const useGenresQuery = () => {
	return useQuery({
		queryKey: genresQueryKey,
		queryFn: async () => {
			const { data, error } = await getGenreList(supabase)

			if (error) throw error;

			return data
		},
		retry: 1,
		staleTime: Infinity
	})
}