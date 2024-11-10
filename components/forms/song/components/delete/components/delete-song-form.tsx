import { useToast } from "@/lib/hooks/ui/use-toast";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { Button } from "@/ui/button";
import { useCallback } from "react";
import { SongEntity } from "@/types/song";
import { useDeleteSong } from "@/components/forms/song/components/delete/hooks/use-delete-song";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { Typography } from "@/ui/typography";
import { SongPlayingBar } from "@/ui/song-playing-bar";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

export const DeleteSongForm = ({
	song
}: {
	song: SongEntity
}) => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { toast } = useToast();
	const { closeDialog } = useDialog();
	const { deleteSongMutation } = useDeleteSong()

	const onSubmit = useCallback(async () => {
		try {
			if (song && user) {
				await deleteSongMutation.mutateAsync({
					id: song.id,
					song_path: song.song_path,
					image_path: song.image_path
				})
			} else {
				toast({
					title: "Нет нужных данных",
					variant: "red"
				})
			}
		} catch (e) {
			throw e;
		}
	}, [deleteSongMutation, song, toast, user])

	if (!user) return null;

	return (
		<div className="flex flex-col items-center gap-4 p-6 min-w-[600px]">
			<Typography className="text-lg !font-bold">
				Вы уверены?
			</Typography>
			<div className="flex w-full items-center gap-2">
				{deleteSongMutation.isPending && (
					<SongPlayingBar/>
				)}
				<Button
					variant="form"
					align="centered"
					rounded="medium"
					background_color="default"
					disabled={deleteSongMutation.isPending}
					onClick={onSubmit}
				>
					Да
				</Button>
			</div>
			<Button
				variant="form"
				className="text-red-500"
				align="centered"
				rounded="medium"
				background_color="default"
				onClick={closeDialog}
			>
				Нет
			</Button>
		</div>
	)
}