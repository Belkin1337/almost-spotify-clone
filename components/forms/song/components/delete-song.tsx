import { useToast } from "@/lib/hooks/ui/use-toast";
import { useUserQuery } from "@/lib/query/user/user-query";
import { Button } from "@/ui/button";
import { useCallback, useEffect } from "react";
import { SongEntity } from "@/types/song";
import { useDeleteSong } from "@/components/forms/song/hooks/use-delete-song";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { Typography } from "@/ui/typography";
import { ItemLoader } from "@/ui/item-loader";

export const DeleteSongForm = ({
	song
}: {
	song: SongEntity
}) => {
	const { data: user } = useUserQuery()
	const { toast } = useToast();
	const { closeDialog } = useDialog();
	const { refresh } = useRouter();
	const { deleteSong } = useDeleteSong()

	const onSubmit = useCallback(async () => {
		try {
			if (song && user) {
				await deleteSong.mutateAsync({
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
	}, [deleteSong, song, toast, user])

	useEffect(() => {
		if (deleteSong.isSuccess && deleteSong.data) {
			const song = deleteSong.data[0];

			closeDialog();
			refresh();

			if (song) {
				toast({
					title: "Трек успешно удален!",
					variant: "right"
				})
			}
		} else if (deleteSong.isError) {
			toast({
				title: "Что-то пошло не так при удалении трека. Повторите попытку позже!",
				variant: "red"
			})
		}
	}, [deleteSong.isSuccess, closeDialog, refresh, deleteSong.data, deleteSong.isError])

	if (!user) return null;

	return (
		<div className="flex flex-col items-center gap-4 p-6 min-w-[600px]">
			<Typography className="text-lg !font-bold">
				Вы уверены?
			</Typography>
			<div className="flex w-full items-center gap-2">
				{deleteSong.isPending && (
					<ItemLoader/>
				)}
				<Button
					variant="form"
					align="centered"
					rounded="medium"
					background_color="default"
					disabled={deleteSong.isPending}
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