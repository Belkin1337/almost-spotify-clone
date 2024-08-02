import { Button } from "@/ui/button";
import { EditArtistForm } from "@/components/forms/artist/components/edit-artist-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { MouseEvent } from "react";
import { DeleteConfirmArtistForm } from "@/components/forms/artist/components/delete-confirm-artist-form";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

export const ArtistEditSubMenu = ({
	artist
}: ArtistItemProps) => {
	const { openDialog } = useDialog();

	return (
		<div className="flex items-start gap-2 justify-between">
			<Button
				variant="form"
				rounded="medium"
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation();
					openDialog({ dialogChildren: <EditArtistForm artist={artist}/> })
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
					openDialog({ dialogChildren: <DeleteConfirmArtistForm artist={artist}/> })
				}}
			>
				Удалить
			</Button>
		</div>
	)
}