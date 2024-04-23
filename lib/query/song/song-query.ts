"use client"

import { useQuery } from "@tanstack/react-query";
import { getSongById } from "@/lib/queries/song/single/get-song-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { songByIdQueryKey } from "@/lib/querykeys/song";
import { SongEntity } from "@/types/song";

const supabase = createClient();

export const useSongQuery = (
	songId: string
) => {
	return useQuery({
		queryKey: songByIdQueryKey(songId),
		queryFn: async () => {
			const { data, error } = await getSongById(supabase, songId);

			if (error) throw error;

			return { data };
		},
		retry: 1,
		enabled: !!songId,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	})
}