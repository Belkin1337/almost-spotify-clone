import { PlaylistEditFields } from "@/components/forms/playlist/components/edit-playlist-form-fields";
import { PlaylistEntity } from "@/types/playlist";
import { useUpdatePlaylist } from "@/components/forms/playlist/hooks/use-update-playlist";
import { Form } from "@/ui/form";

export const PlaylistEditForm = ({
	playlist
}: {
	playlist: PlaylistEntity
}) => {
	const {
		updatePlaylistNameMutation,
		updatePlaylistDescriptionMutation,
		updatePlaylistImageMutation,
		form
	} = useUpdatePlaylist({
		playlist: playlist
	})

	return (
		<Form {...form}>
			<form className="flex flex-col gap-y-6 p-6 max-w-[640px] rounded-xl overflow-hidden">
				<PlaylistEditFields
					form={form}
					playlist={playlist}
				/>
			</form>
		</Form>
	)
}