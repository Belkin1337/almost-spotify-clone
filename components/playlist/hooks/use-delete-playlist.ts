import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlaylistEntity } from "@/types/playlist";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { useRouter } from "next/navigation";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { home_route } from "@/lib/constants/routes/routes";
import { UserEntity } from "@/types/user";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";

const supabase = createClient();

export const useDeletePlaylist = () => {
	const qc = useQueryClient()
	const { push } = useRouter()
	const { closeDialog } = useDialog()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	const deletePlaylistMutation = useMutation({
		mutationFn: async(playlist: PlaylistEntity) => {
			if (!user) return;
			
			if (user.id === playlist.user_id) {
				const { data, error } = await supabase
				.from("playlists")
				.delete()
				.eq("id", playlist.id)
				.eq("user_id", user.id)
				.select()
				
				if (error) throw new Error(error.message);
				
				return data as PlaylistEntity[];
			}
		},
		onSuccess: async(data) => {
			if (data) {
				closeDialog()
				push(home_route)
			}
			
			await Promise.all([
				qc.invalidateQueries({ queryKey: userPlaylistsQueryKey(user?.id, true) }),
				qc.invalidateQueries({ queryKey: userPlaylistsQueryKey(user?.id, false) })
			])
		},
		onError: e => { throw new Error(e.message) }
	})
	
	return { deletePlaylistMutation }
}