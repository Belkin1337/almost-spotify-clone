import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFollowedSongs } from "@/lib/queries/song/multiple/get-followed-songs";
import { followedSongsQueryKey } from "@/lib/querykeys/song";

export const useFollowedSongsQuery = (
	userId: string, count?: number
) => useQuery({
	queryKey: followedSongsQueryKey(userId, count),
	queryFn: () => getFollowedSongs(userId, count),
	placeholderData: keepPreviousData
})