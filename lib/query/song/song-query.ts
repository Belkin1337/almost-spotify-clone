"use client"

import { useQuery } from "@tanstack/react-query";
import { getSongById } from "@/lib/queries/song/single/get-song-by-id";
import { songByIdQueryKey } from "@/lib/querykeys/song";

export const useSongQuery = (
	songId: string
) => {
	return useQuery({
		queryKey: songByIdQueryKey(songId),
		queryFn: () => getSongById(songId),
		retry: 1,
		enabled: !!songId,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	})
}