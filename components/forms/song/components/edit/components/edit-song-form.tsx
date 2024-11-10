import { Form } from "@/ui/form";
import { useCallback, useRef } from "react";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useEditSong } from "@/components/forms/song/components/edit/hooks/use-edit-song";
import { zodSongSchema } from "@/components/forms/song/components/create/types/create-form-types";
import { EditSongFormFields } from "@/components/forms/song/components/edit/components/edit-song-form-fields";
import { SongItemsProps } from "@/components/forms/song/types/song-types";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

export const EditSongForm = ({
	song
}: SongItemsProps) => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { editSongMutation, form } = useEditSong();

	const imageRef = useRef<HTMLInputElement>(null)

	const onSubmit = useCallback(async (
		values: zodSongSchema
	) => {
		if (!values) return;

		await editSongMutation.mutateAsync({
			id: song?.id,
			title: values.title,
			artists: values.artists,
			genre: values.genre
		})
	}, [editSongMutation, song?.id])

	if (!user || !song) return;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 p-6 min-w-[1200px]">
				<EditSongFormFields
					form={form}
					isLoading={editSongMutation.isPending}
					song={song}
					refs={{ imageRef: imageRef }}
				/>
			</form>
		</Form>
	)
}