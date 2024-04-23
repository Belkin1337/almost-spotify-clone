import { useUserQuery } from "@/lib/query/user/user-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { PlaylistEntity } from "@/types/playlist";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useRouter } from "next/navigation";
import { playlist_route } from "@/lib/constants/routes/routes";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useCreatePlaylist = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast()
	const { push } = useRouter()
	const { data: user } = useUserQuery();
	const { data: userPlaylists } = usePlaylistsListByUser(user?.id!)

	const userPlaylistsLength = userPlaylists ? userPlaylists?.length + 1 : 1;
	const defaultPlaylistTitle = `My Playlist #${userPlaylistsLength}`

	const createPlaylist = useMutation({
		mutationFn: async () => {
			try {
				if (!user) return;

				const { data: newPlaylist, error: newPlaylistError } = await supabase
					.from("playlists")
					.insert({
						user_id: user.id,
						title: defaultPlaylistTitle
					})
					.select();

				if (newPlaylistError) {
					return
				} else if (newPlaylist && !newPlaylistError) {
					return newPlaylist as PlaylistEntity[]
				}
			} catch (e) {
				throw e;
			}
		},
		onSuccess: async (data) => {
			if (data) {
				const playlist = data[0];

				push(`${playlist_route}/${playlist.id}`);

				await queryClient.invalidateQueries({
					queryKey: userPlaylistsQueryKey(user?.id!)
				})
			}
		},
		onError: () => {
			toast({
				title: "Ошибка создания трека. Повторите попытку позже!",
				variant: "red"
			})
		}
	})

	return { createPlaylist }
}