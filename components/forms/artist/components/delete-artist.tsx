import {Button} from "@/ui/button";
import {ItemLoader} from "@/ui/item-loader";
import {useDialog} from "@/lib/hooks/ui/use-dialog";
import {useCallback, useEffect} from "react";
import {ArtistEntity} from "@/types/artist";
import {useDeleteArtist} from "@/components/forms/artist/hooks/use-delete-artist";
import {useUserQuery} from "@/lib/query/user/user-query";
import {useToast} from "@/lib/hooks/ui/use-toast";
import {useRouter} from "next/navigation";
import {Typography} from "@/ui/typography";

export const DeleteArtistForm = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	const { data: user } = useUserQuery();
	const { toast } = useToast();
	const { refresh } = useRouter();
	const { closeDialog } = useDialog();
	const { deleteArtist } = useDeleteArtist();

	const onSubmit = useCallback(async () => {
		try {
			if (artist && user) {
				await deleteArtist.mutateAsync({
					id: artist.id,
					cover_image_path: artist.cover_image_path,
					avatar_path: artist.avatar_path
				})
			} else {
				toast({
					title: "Нет нужных данных",
					variant: "red"
				})
			}
		}	catch (e) {
			throw e;
		}
	}, [deleteArtist, artist, toast, user])

	useEffect(() => {
		if (deleteArtist.isSuccess && deleteArtist.data) {
			const artist = deleteArtist.data[0];

			closeDialog();
			refresh();

			toast({
				title: "Артист успешно удален!",
				description: (
					<Typography className="!text-black !font-bold underline">
						Удаленный артист: {artist.name}
					</Typography>
				),
				variant: "right"
			})
		} else if (deleteArtist.isError) {
			toast({
				title: "Что-то пошло не так при удалении артиста. Повторите попытку позже!",
				variant: "red"
			})
		}
	}, [deleteArtist.isSuccess, toast, closeDialog, refresh, deleteArtist.data, deleteArtist.isError]);

	return (
		<div className="flex flex-col items-center gap-4 p-6 min-w-[600px]">
			<Typography className="text-lg !font-bold">
				Вы уверены?
			</Typography>
			<div className="flex items-center w-full gap-2">
				{deleteArtist.isPending && (
					<ItemLoader/>
				)}
				<Button
					variant="form"
					align="centered"
					rounded="medium"
					background_color="default"
					disabled={deleteArtist.isPending}
					onClick={onSubmit}
				>
					Да
				</Button>
			</div>
			<Button
				variant="form"
				className="text-red-500"
				rounded="medium"
				align="centered"
				background_color="default"
				onClick={closeDialog}
			>
				Нет
			</Button>
		</div>
	)
}