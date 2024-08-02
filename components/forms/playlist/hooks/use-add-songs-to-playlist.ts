import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongEntity } from "@/types/song";
import { PlaylistEntity } from "@/types/playlist";
import { playlistSongsQueryKey } from "@/lib/querykeys/playlist";
import { useUploadPlaylistImage } from "@/components/forms/playlist/hooks/use-upload-playlist-image";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";
import { useUserQuery } from "@/lib/query/user/user-query";
import { MESSAGE_ERROR_PLAYLIST_DONT_PERMISSION, MESSAGE_ERROR_SOMETHING } from "@/lib/constants/messages/messages";

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
	const queryClient = useQueryClient();

	const { toast } = useToast();
	const { data: user } = useUserQuery()
	const { uploadPlaylistImageMutation } = useUploadPlaylistImage()

	const addSongsMutation = useMutation({
		mutationFn: async ({
			song,
			playlist
		}: {
			song: SongEntity,
			playlist: PlaylistEntity
		}) => {
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
		onSuccess: async (
			data,
			variables,
		) => {
			if (data) {
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
			}

			await queryClient.invalidateQueries({
				queryKey: playlistSongsQueryKey(variables.playlist.id)
			})

			await queryClient.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!)
			})
		},
		onError: () => {
			toast({
				title: MESSAGE_ERROR_SOMETHING,
				variant: "red"
			})
		}
	})

	return { addSongsMutation }
}