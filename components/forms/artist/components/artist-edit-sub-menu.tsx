import { Button } from "@/ui/button";
import { EditArtistForm } from "@/components/forms/artist/components/edit-artist";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { ArtistEntity } from "@/types/artist";
import { MouseEvent } from "react";
import { DeleteArtistForm } from "@/components/forms/artist/components/delete-artist";

export const ArtistEditSubMenu = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	const { openDialog } = useDialog();

	return (
		<div className="flex items-start gap-2 justify-between">
			<Button
				variant="form"
				rounded="medium"
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation();
					openDialog({
						dialogChildren: <EditArtistForm artist={artist}/>
					})
				}}
			>
				Редактировать
			</Button>
			<Button
				variant="form"
				className="text-red-500"
				rounded="medium"
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation();
					openDialog({
						dialogChildren: <DeleteArtistForm artist={artist}/>
					})
				}}
			>
				Удалить
			</Button>
		</div>
	)
}