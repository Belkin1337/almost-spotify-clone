import { useQuery } from "@tanstack/react-query";
import { GetPlaylistsByUser, getPlaylistsByUser } from "@/lib/queries/playlist/multiple/get-playlists-by-user";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";

export const usePlaylistsListByUser = ({
	userId, show_hidden_playlists, count
}: GetPlaylistsByUser) => useQuery({
	queryKey: userPlaylistsQueryKey(userId, show_hidden_playlists, count),
	queryFn: () => getPlaylistsByUser({
		count, userId, show_hidden_playlists
	}),
	retry: 1,
	refetchOnWindowFocus: false
})