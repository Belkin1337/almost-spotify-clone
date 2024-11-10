import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongEntity } from "@/types/song";
import { PlaylistEntity } from "@/types/playlist";
import { playlistSongsQueryKey } from "@/lib/querykeys/playlist";
import { useUploadPlaylistImage } from "@/components/forms/playlist/hooks/use-upload-playlist-image";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { USER_QUERY_KEY, useUserQuery } from "@/lib/query/user/user-query";
import { MESSAGE_ERROR_PLAYLIST_DONT_PERMISSION, MESSAGE_ERROR_SOMETHING } from "@/lib/constants/messages/messages";
import { UserEntity } from "@/types/user";

const supabase = createClient();

type AddSongToPlaylistQueryType = {
	songId: string,
	playlistId: string
}

async function addSongToPlaylistQuery({
	songId,
	playlistId,
}: AddSongToPlaylistQueryType) {
	const { data: addedSong, error: addedSongErr } = await supabase
	.from("song_playlists")
	.insert({
		song_id: songId,
		playlist_id: playlistId
	})
	.select()
	
	if (addedSongErr) throw addedSongErr;
	
	return { addedSong }
}

export const useAddSongsToPlaylist = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { toast } = useToast();
	const { uploadPlaylistImageMutation } = useUploadPlaylistImage()
	
	const addSongsMutation = useMutation({
		mutationFn: async({ song, playlist }: { song: SongEntity, playlist: PlaylistEntity }) => {
			if (playlist.user_id === user?.id) {
				const { addedSong } = await addSongToPlaylistQuery({
					songId: song.id,
					playlistId: playlist.id
				})
				
				return addedSong as SongEntity[]
			} else {
				toast({
					title: MESSAGE_ERROR_PLAYLIST_DONT_PERMISSION,
					variant: "red"
				})
				
				return;
			}
		},
		onSuccess: async(data, variables,) => {
			if (!data) return	toast({
				title: MESSAGE_ERROR_SOMETHING,
				variant: "red"
			});
			
			if (variables.playlist.image_path === null) {
				await uploadPlaylistImageMutation.mutateAsync({
					playlist: variables.playlist,
					image_path: variables.song.image_path
				})
			}
			
			toast({
				title: `Added to ${variables.playlist.title} playlist!`,
				variant: "right"
			})
			
			await qc.invalidateQueries({
				queryKey: playlistSongsQueryKey(variables.playlist.id)
			})
			
			await qc.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!)
			})
		},
		onError: e => {
			throw new Error(e.message)
		}
	})
	
	return { addSongsMutation }
}