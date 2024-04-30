import { EditSongForm } from "@/components/forms/song/components/edit/components/edit-song-form"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { SongEntity } from "@/types/song"
import { Button } from "@/ui/button"
import { DeleteSongForm } from "@/components/forms/song/components/delete/components/delete-song-form";
import { MouseEvent } from "react";

export const EditSongSubMenu = ({
	song
}: {
	song: SongEntity
}) => {
	const { openDialog } = useDialog()

	return (
		<div className="flex items-start gap-2 justify-between">
			<Button
				variant="form"
				align="centered"
				rounded="medium"
				background_color="default"
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation();
					openDialog({
						dialogChildren: <EditSongForm song={song}/>
					})
				}}
			>
				Редактировать
			</Button>
			<Button
				variant="form"
				align="centered"
				rounded="medium"
				background_color="default"
				className="text-red-500"
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation();
					openDialog({
						dialogChildren: <DeleteSongForm song={song}/>
					})
				}}
			>
				Удалить
			</Button>
		</div>
	)
}