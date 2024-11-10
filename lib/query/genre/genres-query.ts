import { useQuery } from "@tanstack/react-query";
import { getGenreList } from "@/lib/queries/genre/single/get-genre-list";
import { genresQueryKey } from "@/lib/querykeys/genre";

export const useGenresQuery = () => {
	return useQuery({
		queryKey: genresQueryKey,
		queryFn: () => getGenreList(),
		retry: 1,
		staleTime: Infinity
	})
}