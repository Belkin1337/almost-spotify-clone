import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { PlaylistEntity } from "@/types/playlist";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useRouter } from "next/navigation";
import { playlist_route } from "@/lib/constants/routes/routes";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { MESSAGE_ERROR_PLAYLIST_CREATE } from "@/lib/constants/messages/messages";
import { UserEntity } from "@/types/user";
import { createPlaylist } from "@/components/forms/playlist/queries/create-playlist";
import { createPlaylistUsers } from "@/components/forms/playlist/queries/create-playlist-users";

export const useCreatePlaylist = () => {
	const { toast } = useToast()
	const { push } = useRouter()
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { data: userPlaylists } = usePlaylistsListByUser(user?.id!)
	
	const userPlaylistsLength = userPlaylists ? userPlaylists?.length + 1 : 1;
	const defaultPlaylistTitle = `My Playlist #${userPlaylistsLength}`
	
	const createPlaylistMutation = useMutation({
		mutationFn: async() => {
			if (!user) return;
			
			const newPlaylist = await createPlaylist({
				userId: user.id, title: defaultPlaylistTitle
			})
			
			if (newPlaylist) {
				const playlistId = newPlaylist[0].id;
				
				await createPlaylistUsers({
					userId: user.id, playlistId
				})
				
				return newPlaylist as PlaylistEntity[]
			}
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: MESSAGE_ERROR_PLAYLIST_CREATE,
				variant: "red"
			})
			
			const playlist = data[0];
			
			push(playlist_route(playlist.id));
			
			return qc.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!)
			})
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { createPlaylistMutation }
}