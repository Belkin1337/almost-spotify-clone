import { USER_QUERY_KEY, useUserQuery } from "@/lib/query/user/user-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { PlaylistEntity } from "@/types/playlist";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useRouter } from "next/navigation";
import { playlist_route } from "@/lib/constants/routes/routes";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { MESSAGE_ERROR_PLAYLIST_CREATE } from "@/lib/constants/messages/messages";
import { UserEntity } from "@/types/user";

const supabase = createClient();

type CreatePlaylistQueryType = {
	userId: string,
	title: string
}

type CreatePlaylistUsersQueryType = {
	playlistId: string,
	userId: string
}

async function createPlaylistQuery({
	userId,
	title
}: CreatePlaylistQueryType) {
	const { data: newPlaylist, error: newPlaylistErr } = await supabase
	.from("playlists")
	.insert({
		user_id: userId,
		title: title
	})
	.select();
	
	if (newPlaylistErr) throw newPlaylistErr;
	
	return { newPlaylist }
}

async function createPlaylistUsersQuery({
	userId,
	playlistId
}: CreatePlaylistUsersQueryType) {
	const { error } = await supabase
	.from("playlists_users")
	.insert({
		playlist_id: playlistId,
		user_id: userId
	})
	
	if (error) throw error;
}

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
			
			try {
				const { newPlaylist } = await createPlaylistQuery({
					userId: user.id,
					title: defaultPlaylistTitle
				})
				
				if (newPlaylist) {
					const playlistId = newPlaylist[0].id;
					
					await createPlaylistUsersQuery({
						userId: user.id,
						playlistId: playlistId
					})
					
					return newPlaylist as PlaylistEntity[]
				}
			} catch (e) {
				throw e;
			}
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: MESSAGE_ERROR_PLAYLIST_CREATE,
				variant: "red"
			})
			
			const playlist = data[0];
			
			push(playlist_route(playlist.id));
			
			await qc.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!)
			})
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { createPlaylistMutation }
}