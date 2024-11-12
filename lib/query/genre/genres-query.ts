import { useQuery } from "@tanstack/react-query";
import { getGenreList } from "@/lib/queries/genre/single/get-genre-list";

export const GENRES_QUERY_KEY = ["genres"]

export const useGenresQuery = () => useQuery({
	queryKey: GENRES_QUERY_KEY,
	queryFn: () => getGenreList(),
	refetchOnWindowFocus: false,
	gcTime: Infinity,
	staleTime: Infinity
})