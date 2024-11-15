import { Button } from "@/ui/button";
import { SongPlayingBar } from "@/ui/song-playing-bar";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useDeleteArtist } from "@/components/forms/artist/hooks/use-delete-artist";
import { Typography } from "@/ui/typography";
import { ArtistItemProps } from "@/components/artist/types/artist-types";
import { UserEntity } from "@/types/user";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useQueryClient } from "@tanstack/react-query"

export const DeleteConfirmArtistForm = ({
	artist
}: ArtistItemProps) => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { closeDialog } = useDialog();
	const { deleteArtistMutation } = useDeleteArtist();
	
	const onSubmit = () => {
		if (!artist || !user) return;
		
		const { id, cover_image_path, avatar_path } = artist;
		
		return deleteArtistMutation.mutate({
			id, cover_image_path, avatar_path
		})
	}
	
	return (
		<div className="flex flex-col items-center gap-4 p-6 min-w-[600px]">
			<Typography className="text-lg !font-bold">
				Вы уверены?
			</Typography>
			<div className="flex items-center w-full gap-2">
				{deleteArtistMutation.isPending && <SongPlayingBar/>}
				<Button
					variant="form"
					align="centered"
					rounded="medium"
					background_color="default"
					disabled={deleteArtistMutation.isPending}
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